import { UAction } from 'atma-utest';
import { Directory, File } from 'atma-io';
import alot from 'alot';
import { TAddress } from '@dequanto/models/TAddress';
import { $regexp } from '@dequanto/utils/$regexp';
import { $require } from '@dequanto/utils/$require';

UAction.create({

    async 'download openrpc jsons'() {
        const openRpcPaths = [
            {
                name: 'metamask',
                path: 'https://metamask.github.io/api-specs/latest/openrpc.json'
            },
            {
                name: 'coregeth',
                path: 'https://raw.githubusercontent.com/etclabscore/ethereum-json-rpc-specification/master/openrpc.json'
            }, {
                name: 'eth',
                path: 'https://raw.githubusercontent.com/maticnetwork/polygon-cli/main/rpctypes/schemas/openrpc.json'
            }
        ];
        await alot(openRpcPaths)
            .forEachAsync(async data => {
                let resp = await fetch(data.path);
                let json = await resp.json();

                await File.writeAsync(`./data/rpc/${data.name}.json`, json);
            })
            .toArrayAsync()
    },
    async '!generate models'() {
        const openRPCs = [
            'metamask',
            'coregeth',
            'eth',
            'overrides'
        ].map(scope => {
            return {
                scope: scope as IRpcMethod['scope'][0],
                json: `./data/rpc/${scope}.json`
            }
        });
        const generator = new Generator(openRPCs);
        const code = await generator.generate();

        await File.writeAsync('./src/rpc/Rpc.ts', code);
    }
});


class Generator {

    private code: string = '';
    private rpc: IRpc;

    constructor(public openRPCs: { json: string, scope: IRpcMethod['scope'][0] }[]) {
        let x: TAddress
    }

    async generate() {
        let rpc = this.rpc = await this.combineRPCs();
        let template = [
            `/** Autogenerated with "atma act ./actions/rpc.act.ts" */`,
            ``,
            `import { DataLike } from '@dequanto/utils/types';`,
            `import { TEth } from '@dequanto/models/TEth';`,
            `import { RpcBase } from '@dequanto/rpc/RpcBase';`,
            `import { RpcSubscription, RpcLogFilterOptions } from '@dequanto/rpc/RpcSubscription';`,
            `//import { RpcHandler, RpcTransport } from '@dequanto/rpc/RpcHandler';`,

        ];

        let methods = [];
        let methodsRequests = [];
        let types = [];

        rpc.methods.forEach(method => {
            methods.push('')
            methods.push(this.writeMethodComment(method));
            methods.push(this.writeMethodSignature(method) + ' {');

            let isSubscription = method.name === 'eth_subscribe';
            let baseMethod = isSubscription ? 'subscribe' : 'request';

            methods.push(...[
                `    return this.${baseMethod}({ method: '${method.name}', params: Array.from(arguments) })`,
                `}`,
            ]);

            if (isSubscription === false) {
                methodsRequests.push(...[
                    this.writeMethodSignature(method, { isRequest: true }) + ' {',
                    `    return { method: '${method.name}', params: Array.from(arguments) };`,
                    `},`
                ]);
            }
        });

        let schemas = rpc.components.schemas;
        let knownSchemas = SchemaWalker.getUsedTypes(rpc);
        for (let key in schemas) {
            if (key in knownSchemas === false) {
                continue;
            }
            let schema = schemas[key];
            types.push(``);
            if (schema.title) {
                types.push(`/** ${schema.title} */`);
            }
            types.push(`export type ${key} = ${this.writeSchema(schema)}`)
            types.push(``);
        }

        return [
            ...template,

            `export class Rpc extends RpcBase {`,
            ...methods,
            `    protected returnSchemas = ${this.writeMethodReturnSchemas(rpc)};`,
            `    public req = {`,
            ...methodsRequests,
            `    }`,
            `}`,

            `export namespace RpcTypes {`,
            ...types,
            `}`
        ].join('\n');
    }

    private async combineRPCs() {
        let jsons = await alot(this.openRPCs).mapAsync(async rpc => {
            return {
                json: await File.readAsync<IRpc>(rpc.json),
                scope: rpc.scope,
            };
        }).toArrayAsync();

        let combined = <IRpc>{
            methods: [],
            components: {
                schemas: {}
            }
        };
        jsons.filter(x => x.scope !== 'overrides').forEach(rpc => {
            rpc.json.methods.forEach(method => {
                let current = combined.methods.find(m => m.name === method.name);
                if (current) {
                    current.scope.push(rpc.scope);
                    return;
                }
                combined.methods.push({
                    scope: [rpc.scope],
                    ...method,
                });
            });
            let schemasCurrent = combined.components.schemas;
            let schemasSource = rpc.json.components.schemas ?? {};

            function fromSource(source: typeof schemasSource) {
                for (let key in source) {
                    if (key in schemasCurrent) {
                        continue;
                    }
                    schemasCurrent[key] = source[key];
                }
            }
            fromSource(rpc.json.components.schemas ?? {});
            fromSource(rpc.json.components.contentDescriptors ?? {});
        });
        jsons.filter(x => x.scope === 'overrides').forEach(({ json }) => {
            Object.keys(json.components.schemas).forEach(name => {
                let source = json.components.schemas[name];

                if (name.startsWith('(')) {
                    let rgx = new RegExp(name);
                    for (let key in combined.components.schemas) {
                        if (rgx.test(key) === false) {
                            continue;
                        }
                        merge(combined.components.schemas[key], source);
                    }
                    return;
                }

                let target = combined.components.schemas[name];
                $require.notNull(target, `Schema ${name} not found`);


                if ('allOf' in target || 'oneOf' in target) {
                    let arr = (target as ISchema.AllOf).allOf ?? (target as ISchema.OneOf).oneOf;
                    let withProps = arr.find(x => 'properties' in x);
                    if (withProps === null) {
                        throw new Error(`Merge error - allOf/onOf contains no properties field`);
                    }
                    merge(withProps, source);
                    return;
                }
                merge(target, source);
            });
            json.methods.forEach(method => {
                let current = combined.methods.find(m => m.name === method.name);
                if (current == null) {
                    combined.methods.push(method);
                    return;
                }
                if (method.result != null) {
                    current.result = method.result;
                }
                method.params?.forEach((param, i) => {
                    let x = method.params[i];
                    if (x != null) {
                        current.params[i] = x;
                    }
                });
            });


            function merge(target, source) {
                for (let key in source) {
                    let sourceValue = source[key];
                    let targetValue = target[key];
                    if (targetValue == null) {
                        target[key] = sourceValue;
                        if (key === 'type') {
                            delete target.$ref;
                        }
                        continue;
                    }
                    if (typeof sourceValue !== 'object') {
                        target[key] = sourceValue;
                        continue;
                    }
                    merge(targetValue, sourceValue);
                }
            }
        });


        // Normalize

        combined.methods.forEach(m => {
            m.params.forEach((param, i) => {
                if (param.name == null && '$ref' in param) {
                    /** If parameter is simple type reference - extract name and normalize model */
                    let ref = param.$ref as string;
                    let name = /\w+$/.exec(ref)[0];

                    param = { name, schema: param as ISchema.TSchema };
                    m.params[i] = param;
                }
                if (/[A-Z]/.test(param.name)) {
                    // normalize param name
                    param.name = param.name[0].toLowerCase() + param.name.slice(1);
                }
                if (/\s/.test(param.name)) {
                    // normalize param name
                    param.name = param.name.replace(/\s+([\w])/g, (match, char) => {
                        return char.toUpperCase();
                    });
                }
            })
        });


        SchemaWalker.visitSchema(combined, schema => {
            if ('anyOf' in schema) {
                (schema as any).oneOf = schema.anyOf;
                delete schema.anyOf;
            }
            if ('oneOf' in schema) {
                schema.type = 'oneOf';
            }
            if ('allOf' in schema) {
                schema.type = 'allOf';
            }
            if (schema.type == null) {
                if ('properties' in schema) {
                    schema.type = 'object';
                }
            }
            if (Array.isArray(schema.type)) {
                let arr = schema.type.filter(x => x !== 'null')
                $require.True(arr.length === 1, `Multiple types: ${schema.type.join(', ')}`);
                schema.type = arr[0];
            }
            if ('$ref' in schema) {
                let type = SchemaWalker.getRefType(schema);
                if (/(uint|integer)/i.test(type)) {
                    return { type: 'bigint' };
                }
                if (/^byte$/.test(type)) {
                    return { type: 'number' };
                }
                if (/^(bytes|hash)/i.test(type)) {
                    return { type: 'TEth.Hex' } as any;
                }
                if (/^address$/.test(type)) {
                    return { type: 'TEth.Address' } as any;
                }
            }
            if (/integer/.test(schema.type)) {
                return { type: 'bigint' };
            }
            return schema;
        });

        SchemaWalker.visitGlobalSchema(combined, (name, schema) => {
            // Upper case all class names
            name = name[0].toUpperCase() + name.slice(1);
            return [name, schema];
        });
        SchemaWalker.visitSchema(combined, (schema) => {
            if ('$ref' in schema) {
                // use simple null for unknown types
                if (/(NotFound|Null)/.test(schema.$ref)) {
                    return { type: 'null' }
                }
            }
            return schema;
        });
        SchemaWalker.visitSchema(combined, (schema) => {
            if ('oneOf' in schema) {
                // Remove NofFound|Null values from oneOf
                schema.oneOf = schema.oneOf.filter(x => x.type !== 'null');
                if (schema.oneOf.length === 1) {
                    return schema.oneOf[0];
                }
            }
            return schema;
        });

        SchemaWalker.visitSchema(combined, (schema) => {
            if ('$ref' in schema) {
                let type = SchemaWalker.getRefType(schema);
                let property = SchemaWalker.getRefTypeProperty(schema);
                if (property) {
                    let Type = combined.components.schemas[type] as ISchema.Object;
                    return Type.properties[property];
                }
            }
            return schema;
        });

        function unwrapSimpleTypes () {
            SchemaWalker.visitSchema(combined, (schema) => {
                if ('$ref' in schema) {
                    let refSchema = SchemaWalker.getRefSchema(combined, schema);
                    if (SchemaWalker.isValueType(refSchema)) {
                        return refSchema;
                    } else if (refSchema.type === 'array') {
                        if (SchemaWalker.isValueType(refSchema.items) || '$ref' in refSchema.items) {
                            return refSchema;
                        }
                    }
                }
                return schema;
            });
        }
        unwrapSimpleTypes();
        unwrapSimpleTypes();

        SchemaWalker.visitSchema(combined, (schema) => {
            if ('oneOf' in schema) {
                // some have duplicate types
                schema.oneOf = alot(schema.oneOf)
                    .distinctBy(x => this.writeSchema(x))
                    .toArray()
            }
            return schema;
        });


        SchemaWalker.visitSchema(combined, (schema) => {
            if ('properties' in schema) {
                const props = schema.properties;
                if ('v' in props) {
                    props.v.type =  'number';
                }
                if ('r' in props) {
                    props.r.type =  'TEth.Hex' as any;
                }
                if ('s' in props) {
                    props.s.type =  'TEth.Hex' as any;
                }
                if ('yParity' in props) {
                    props.yParity.type =  'number';
                }
            }
            return schema;
        });

        return combined;
    }

    private writeMethodSignature(method: IRpcMethod, options?: { isRequest?: boolean }) {
        if (method.name === 'eth_subscribe') {
            return [
                `eth_subscribe(type: 'newHeads'): Promise<RpcSubscription<TEth.Block>>`,
                `eth_subscribe(type: 'logs', options: RpcLogFilterOptions): Promise<RpcSubscription<TEth.Log>>`,
                `eth_subscribe(type: 'newPendingTransactions'): Promise<RpcSubscription<TEth.Tx>>`,
                `eth_subscribe(type: any, options?): Promise<RpcSubscription<any>>`
            ].join('\n');
        }
        let isOptional = false;
        let params = method.params.map(param => {
            if (param.schema == null) {
                console.error(`No schema for ${param.name}`, method);
            }
            /** If optional param was already seen previously, make all other also optional */
            isOptional = isOptional || !param.required;
            return `${param.name}${isOptional ? '?' : ''}: ${this.writeSchema(param.schema, '', 'argument')}`
        });
        let str = `${method.name}(${params.join(', ')})`;
        let resultSchema = 'schema' in method.result ? method.result.schema : method.result;
        if (resultSchema == null) {
            console.error(`No schema for result ${method.name}`, method);
        }
        let returns = options?.isRequest
            ? ` { method: string, params: any[] }`
            : `Promise<${this.writeSchema(resultSchema)}>`
        return `${str}: ${returns}`
    }
    private writeMethodReturnSchemas(rpc: IRpc) {
        // clone
        // rpc = JSON.parse(JSON.stringify(rpc));

        // SchemaWalker.mapRef(rpc, {
        //     [`address`]: 'string',
        //     [`^(hash|bytes)`]: 'string'
        // });

        let schemasOut = {};
        let methods = rpc.methods.reduce((x, method) => {
            let info = this.jsonReturnsSchema('schema' in method.result ? method.result.schema : method.result, schemasOut);
            if (info) {
                x[method.name] = info;
            }
            return x;
        }, {});
        let schemas = Object.keys(schemasOut).reduce((x, schemaName) => {
            let info = this.jsonReturnsSchema(rpc.components.schemas[schemaName] ?? rpc.components.contentDescriptors[schemaName]);
            if (info) {
                x[schemaName] = info;
            }
            return x;
        }, {})
        return JSON.stringify({ methods, schemas }, null, '    ');
    }

    private writeSchema(schema: ISchema.TSchema, ident = '', location?: 'argument' | 'return') {
        if ('$ref' in schema) {
            let str = schema.$ref;
            let type = /(schemas|contentDescriptors)\/(?<type>\w+)(\/|$)/.exec(str)?.groups.type;
            if (type == null) {
                console.error(schema);
                throw Error(`Not valid schema path: ${str}`);
            }
            let result = `RpcTypes.${type}`;
            if (location === 'argument') {
                result = `DataLike<${result}>`;
            }
            let props = /properties\/(?<props>.+)$/.exec(str)?.groups.props;
            if (props) {
                result += props.split('/').map(x => `['${x}']`).join('');
            }
            return result;
        }
        if (schema.type === 'string') {
            if ('enum' in schema) {
                return schema.enum.map(x => `'${x}'`).join(' | ');
            }
            return 'string'
        }
        if (schema.type === 'boolean') {
            return 'boolean';
        }
        if (schema.type === 'null') {
            return 'undefined';
        }
        if (schema.type === 'array') {
            if (schema.items == null) {
                return `any[]`;
            }
            return `${this.writeSchema(schema.items, ident + '    ')}[]`
        }
        if (schema.type === 'object') {
            let props = schema.properties;
            let str = [
                `{`,
            ];
            for (let key in props) {
                let keyWrapped = /^[a-z_]\w*$/i.test(key) ? key : `'${key}'`;
                let prop = props[key];
                if (prop.title) {
                    str.push(`    /* ${prop.title} */`)
                }
                str.push(`    ${keyWrapped}: ${this.writeSchema(prop, ident + '    ')};`);
            }
            if (schema.additionalProperties) {
                let propType = 'any';
                if (typeof schema.additionalProperties === 'object') {
                    propType = this.writeSchema(schema.additionalProperties, ident + '    ');
                }
                str.push(`    [key: string]: ${propType}`);
            }
            if (str.length === 1) {
                str.push(`    [key: string]: any`);
            }
            str.push(`}`);
            return str.map((x, i) => `${i === 0 ? '' : ident}${x}`).join('\n');
        }
        if ('oneOf' in schema) {
            return schema
                .oneOf
                .map(schema => this.writeSchema(schema))
                .join(' | ');
        }
        if ('allOf' in schema) {
            return schema
                .allOf
                .map(schema => this.writeSchema(schema))
                .join(' & ');
        }

        return schema.type ?? 'any';
    }
    private jsonReturnsSchema(schema: ISchema.TSchema, schemasOut = {}) {
        if ('$ref' in schema) {
            let str = schema.$ref;
            let type = /(schemas|contentDescriptors)\/(?<type>\w+)(\/|$)/.exec(str)?.groups.type;
            if (type == null) {
                console.error(schema);
                throw Error(`Not valid schema path: ${str}`);
            }
            schemasOut[type] = 1;
            return type;
        }
        switch (schema.type) {
            case 'string':
            case 'TAddress':
            case 'THex':
                return 'string';
        }
        if (schema.type === 'number') {
            return 'number';
        }
        if (schema.type === 'boolean') {
            return 'boolean';
        }
        if (schema.type === 'null') {
            return 'undefined';
        }
        if (schema.type === 'integer' || schema.type === 'bigint') {
            return 'bigint'
        }
        if (schema.type === 'array') {
            if (schema.items == null) {
                return { type: 'array' }
            }
            let resultType = this.jsonReturnsSchema(schema.items, schemasOut);
            if (resultType == null) {
                return null;
            }
            return [resultType];
        }
        if (schema.type === 'object') {
            let type = {};
            let props = schema.properties;
            for (let key in props) {
                let propType = this.jsonReturnsSchema(props[key], schemasOut);
                if (propType != null) {
                    type[key] = propType;
                }
            }
            return type;
        }
        switch (schema.type as any) {
            case 'TEth.Hex':
            case 'TEth.Address':
                return 'string'
        }

        if ('oneOf' in schema || 'allOf' in schema) {
            let key = 'oneOf' in schema? 'oneOf' : 'allOf';
            let arr = SchemaWalker.mergeOneOfAnyOf(schema);
            if (arr.length === 1) {
                return this.jsonReturnsSchema(arr[0], schemasOut);
            }
            return {
                [key]: schema[key].map(schema => this.jsonReturnsSchema(schema, schemasOut))
            };
        }

        console.error(`unknown`, schema);
    }
    private writeMethodComment(method: IRpcMethod, ident = '') {

        let str = [
            `/**`,
            ` * ${method.summary ?? ''} <${method.scope?.join(' | ')}> `,
            ` * ${method.description ?? ''}`
        ];
        method.params?.forEach(param => {
            str.push(...[
                ` * @param ${param.name} - ${param.description ?? ((param as any).schema?.description) ?? ''}`
            ]);
        });
        if ('schema' in method.result) {
            str.push(` * @returns ${method.result.name} - ${method.result.description ?? ''}`);
        }
        str.push(' */');

        return str.map(x => `${ident}${x}`).join('\n');
    }
}


interface IRpc {
    methods: IRpcMethod[];
    components: {
        schemas: {
            [name: string]: ISchema.TSchema
        }
        contentDescriptors?: {
            [name: string]: ISchema.TSchema
        }
    }
}

interface IRpcMethod {
    scope: ('wallet' | 'geth' | 'overrides')[]
    name: string
    summary: string
    description: string
    params: IRpcParameter[]
    result: ISchema.TSchema | IRpcResult
}
interface IRpcParameter {
    name: string
    description?: string
    required?: boolean
    schema: ISchema.TSchema
}
interface IRpcResult {
    name: string
    schema: ISchema.TSchema
    description?: string
}


namespace ISchema {
    export type TSchema = Null
        | Any
        | String
        | Value
        | Object
        | Array
        | Boolean
        | Integer
        | Ref
        | OneOf
        | AllOf
        ;

    interface IRpcSchemaBase {
        title?: string
        type: 'any' | 'object' | 'string' | 'array' | 'number' | 'integer' | 'boolean' | 'null' | 'oneOf' | 'allOf' | 'TAddress' | 'THex' | 'bigint'
        description?: string
    }

    export interface Any extends IRpcSchemaBase {
        type: 'any'
    }
    export interface Null extends IRpcSchemaBase {
        type: 'null'
    }
    export interface Value extends IRpcSchemaBase {
        type: 'bigint' | 'number' | 'TAddress' | 'THex'
    }
    export interface Integer extends IRpcSchemaBase {
        type: 'integer'
    }
    export interface String extends IRpcSchemaBase {
        type: 'string'
        enum?: string[]
    }
    export interface Boolean extends IRpcSchemaBase {
        type: 'boolean'
    }
    export interface Object extends IRpcSchemaBase {
        type: 'object'
        properties?: {
            [property: string]: TSchema
        }
        additionalProperties?: TSchema
    }
    export interface Array extends IRpcSchemaBase {
        type: 'array'
        items?: TSchema
    }
    export interface OneOf extends IRpcSchemaBase {
        type: 'oneOf'
        oneOf: TSchema[]
    }
    export interface AllOf extends IRpcSchemaBase {
        type: 'allOf'
        allOf: TSchema[]
    }

    export interface Ref {
        title?: string
        type?: ''
        $ref: string // "#/components/schemas/AddEthereumChainParameter"
    }

}


namespace SchemaWalker {
    export function getRefType (schema: ISchema.Ref) {
        return /(schemas|contentDescriptors)\/(?<type>\w+)(\/|$)/.exec(schema.$ref)?.groups.type;
    }
    export function getRefSchema (rpc: IRpc, schema: ISchema.Ref) {
        let name = getRefType(schema);
        let ref = rpc.components.schemas[name];
        $require.notNull(ref, `Could not find schema for ${name}`);
        return ref as ISchema.TSchema;
    }
    export function getRefTypeProperty (schema: ISchema.Ref) {
        return /properties\/(?<props>.+)$/.exec(schema.$ref)?.groups.props;
    }
    export function isValueType (schema: ISchema.TSchema) {
        return schema.type != null
            && '$ref' in schema === false
            && 'items' in schema === false
            && 'properties' in schema === false
            && 'oneOf' in schema === false
            && 'allOf' in schema === false
        ;
    }

    // export function mapRef(rpc: IRpc, mappings: { [rgx: string]: string }) {
    //     let rgx = alot
    //         .fromObject(mappings ?? {}).map(x => ({ rgx: new RegExp(x.key, 'i'), type: x.value }))
    //         .toArray();

    //     rpc.methods.forEach(method => {
    //         method.params = method.params.map(param => {
    //             return mapSchemaRef(param, rgx);
    //         });
    //         method.result = mapSchemaRef(method.result, rgx);
    //     });

    //     let schemas = rpc.components.schemas ?? {};
    //     Object.keys(schemas).forEach(key => {
    //         schemas[key] = mapSchemaRef(schemas[key], rgx);
    //     });
    //     let descriptors = rpc.components.contentDescriptors ?? {};
    //     Object.keys(descriptors).forEach(key => {
    //         descriptors[key] = mapSchemaRef(descriptors[key], rgx);
    //     });
    // }


    export function visitGlobalSchema(rpc: IRpc, visitor: (name, schema: ISchema.TSchema) => ([string, ISchema.TSchema] | undefined)) {
        walk(rpc.components.schemas ?? {});
        walk(rpc.components.contentDescriptors ?? {});
        function walk(schemas) {
            Object.keys(schemas).forEach(key => {
                let schema = schemas[key];
                let [newKey, newSchema] = visitor(key, schema) ?? [ key, schema ];
                if (newKey !== key) {
                    visitSchema(rpc, (schema) => {
                        if ('$ref' in schema && schema.$ref?.endsWith(key)) {
                            schema.$ref = schema.$ref.replace(key, newKey);
                        }
                        return schema;
                    });
                    delete schemas[key];
                }
                schemas[newKey] = newSchema;
            });
        }
    }
    export function visitSchema(rpc: IRpc, visitor: (schema: ISchema.TSchema) => (ISchema.TSchema | null), opts?: {
        inMethods?: boolean
        inGlobals?: boolean | string
    }) {
        let inMethods = opts?.inMethods ?? (opts?.inGlobals == null)
        let inGlobals = opts?.inGlobals != null
            ? Boolean(opts?.inGlobals)
            : (opts?.inMethods == null)
        let inGlobalsName = typeof opts?.inGlobals ==='string' ? opts.inGlobals : null;

        if (inMethods) {
            rpc.methods.forEach(method => {
                method.params = method.params.map(param => {
                    return walkWrapped(param);
                });
                method.result = walkWrapped(method.result)
            });
        }

        if (inGlobals) {
            walkGlobal(rpc.components.schemas ?? {});
            walkGlobal(rpc.components.contentDescriptors ?? {});
        }

        function walkWrapped(mix: IRpcParameter | IRpcResult | ISchema.TSchema) {
            if ('schema' in mix) {
                mix.schema = walkSchema(mix.schema, []);
                return mix;
            }
            return {
                ...(mix as any),
                schema: walkSchema(mix as ISchema.TSchema, [])
            };
        }
        function walkGlobal(schemas) {
            Object.keys(schemas).forEach(key => {
                if (inGlobalsName != null && key !== inGlobalsName) {
                    return;
                }
                let schema = schemas[key];
                schemas[key] = walkSchema(schema, []);
            });
        }

        function walkSchema(schema: ISchema.TSchema, parents: ISchema.TSchema[]) {
            if (schema == null) {
                schema = { type: 'any' }
            }
            schema = visitor(schema) ?? schema;
            if (schema.type === 'object') {
                for (let key in schema.properties) {
                    schema.properties[key] = walkSchema(schema.properties[key], [...parents, schema]);
                }
            }
            if (schema.type === 'array') {
                schema.items = walkSchema(schema.items, [...parents, schema]);
            }
            if ('oneOf' in schema) {
                schema.oneOf = schema.oneOf.map(x => {
                    return walkSchema(x, [...parents, schema])
                });
            }
            if ('allOf' in schema) {
                schema.allOf = schema.allOf.map(x => {
                    return walkSchema(x, [...parents, schema])
                });
            }
            return schema;
        }
    }

    export function getUsedTypes (rpc: IRpc) {
        let knownSchemas = {};
        SchemaWalker.visitSchema(rpc, (schema) => {
            if ('$ref' in schema) {
                let type = SchemaWalker.getRefType(schema);
                knownSchemas[type] = true;
                walkGlobalSchemas(type);
            }
            return schema;
        }, { inMethods: true });

        function walkGlobalSchemas (name: string) {
            SchemaWalker.visitSchema(rpc, (schema) => {
                if ('$ref' in schema) {
                    let type = SchemaWalker.getRefType(schema);
                    if (type in knownSchemas) {
                        return;
                    }
                    knownSchemas[type] = true;
                    walkGlobalSchemas(type);
                }
                return schema;
            }, { inGlobals: name });
        }
        return knownSchemas;
    }


    export function mergeOneOfAnyOf (schema: ISchema.OneOf | ISchema.AllOf) {
        let arr = 'oneOf' in schema ? schema.oneOf : schema.allOf;
        arr = arr.filter(x => /(notFound|null)/i.test((x as any).$ref ?? '') === false);

        // Merge object schemas
        let obj = null;
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            if (x.type === 'object') {
                if (obj == null) {
                    obj = x;
                    continue;
                }
                for (let key in x.properties) {
                    if (obj.properties[key] == null) {
                        obj.properties[key] = x.properties[key];
                    }
                }
                arr.splice(i, 1);
                i--;
            }
        }
        return arr;
    }
}
