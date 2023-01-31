"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorFromAbi = void 0;
const alot_1 = __importDefault(require("alot"));
const atma_io_1 = require("atma-io");
const atma_utils_1 = require("atma-utils");
const _abiType_1 = require("@dequanto/utils/$abiType");
const _date_1 = require("@dequanto/utils/$date");
const _path_1 = require("@dequanto/utils/$path");
const _abiUtils_1 = require("@dequanto/utils/$abiUtils");
const _config_1 = require("@dequanto/utils/$config");
const _logger_1 = require("@dequanto/utils/$logger");
const GeneratorStorageReader_1 = require("./GeneratorStorageReader");
const Str_1 = require("./utils/Str");
const _gen_1 = require("./utils/$gen");
class GeneratorFromAbi {
    static get Gen() {
        return Gen;
    }
    async generate(abiJson, opts) {
        let methodsArr = (0, alot_1.default)(abiJson)
            .filter(x => x.type === 'function')
            .groupBy(x => x.name)
            .map(group => {
            if (group.values.length === 1) {
                let item = group.values[0];
                return Gen.serializeMethodTs(item);
            }
            if (group.values.length > 1) {
                let items = group.values;
                return Gen.serializeMethodTsOverloads(items);
            }
            return null;
        })
            .filter(Boolean)
            .map(Str_1.Str.formatMethod)
            .toArray();
        let methodInterfacesArr = (0, alot_1.default)(abiJson)
            .filter(x => x.type === 'function')
            .groupBy(x => x.name)
            .map(group => {
            let item = group.values[0];
            return Gen.serializeMethodInterfacesTs(item.name, group.values);
        })
            .filter(Boolean)
            .toArray();
        let methodInterfacesAll = Gen.serializeMethodInterfacesAllTs(methodInterfacesArr);
        let eventsArr = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEvent(x))
            .filter(Boolean)
            .map(Str_1.Str.formatMethod);
        ;
        let eventInterfacesAll = Gen.serializeEventsInterfacesAllTs(abiJson.filter(x => x.type === 'event'));
        let eventsExtractorsArr = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEventExtractor(x))
            .filter(Boolean)
            .map(Str_1.Str.formatMethod);
        let eventsFetchersArr = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEventFetcher(x))
            .filter(Boolean)
            .map(Str_1.Str.formatMethod);
        let eventInterfaces = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEventInterface(x))
            .filter(Boolean)
            .map(Str_1.Str.formatMethod);
        ;
        let methods = methodsArr.join('\n\n');
        let events = eventsArr.join('\n\n');
        let eventsExtractors = eventsExtractorsArr.join('\n\n');
        let eventsFetchers = eventsFetchersArr.join('\n\n');
        let name = opts.name;
        let templatePath = _path_1.$path.resolve(`/src/gen/ContractTemplate.ts`);
        let template = await atma_io_1.File.readAsync(templatePath, { skipHooks: true });
        let EtherscanStr;
        let EthWeb3ClientStr;
        let imports = [];
        let explorerUrl;
        let Web3ClientOptions = '';
        let EvmScanOptions = '';
        switch (opts.network) {
            case 'bsc':
                EtherscanStr = 'Bscscan';
                EthWeb3ClientStr = 'BscWeb3Client';
                imports = [
                    `import { Bscscan } from '@dequanto/BlockchainExplorer/Bscscan'`,
                    `import { BscWeb3Client } from '@dequanto/clients/BscWeb3Client'`,
                ];
                explorerUrl = `https://bscscan.com/address/${opts.implementation}#code`;
                break;
            case 'polygon':
                EtherscanStr = 'Polyscan';
                EthWeb3ClientStr = 'PolyWeb3Client';
                imports = [
                    `import { Polyscan } from '@dequanto/BlockchainExplorer/Polyscan'`,
                    `import { PolyWeb3Client } from '@dequanto/clients/PolyWeb3Client'`,
                ];
                explorerUrl = `https://polygonscan.com/address/${opts.implementation}#code`;
                break;
            case 'xdai':
                EtherscanStr = 'XDaiscan';
                EthWeb3ClientStr = 'XDaiWeb3Client';
                imports = [
                    `import { XDaiscan } from '@dequanto/chains/xdai/XDaiscan'`,
                    `import { XDaiWeb3Client } from '@dequanto/chains/xdai/XDaiWeb3Client'`,
                ];
                explorerUrl = `https://blockscout.com/xdai/mainnet/address/${opts.implementation}/contracts`;
                break;
            case 'eth':
                EtherscanStr = 'Etherscan';
                EthWeb3ClientStr = 'EthWeb3Client';
                imports = [
                    `import { Etherscan } from '@dequanto/BlockchainExplorer/Etherscan'`,
                    `import { EthWeb3Client } from '@dequanto/clients/EthWeb3Client'`,
                ];
                explorerUrl = `https://etherscan.io/address/${opts.implementation}#code`;
                break;
            case 'hardhat':
                EtherscanStr = 'Etherscan';
                EthWeb3ClientStr = 'HardhatWeb3Client';
                imports = [
                    `import { Etherscan } from '@dequanto/BlockchainExplorer/Etherscan'`,
                    `import { HardhatWeb3Client } from '@dequanto/clients/HardhatWeb3Client'`,
                ];
                explorerUrl = ``;
                break;
            default: {
                let web3Config = _config_1.$config.get(`web3.${opts.network}`);
                if (web3Config) {
                    EtherscanStr = 'Evmscan';
                    EthWeb3ClientStr = 'EvmWeb3Client';
                    imports = [
                        `import { Evmscan } from '@dequanto/BlockchainExplorer/Evmscan'`,
                        `import { EvmWeb3Client } from '@dequanto/clients/EvmWeb3Client'`,
                    ];
                    Web3ClientOptions = `{ platform: '${opts.network}' }`;
                    EvmScanOptions = `{ platform: '${opts.network}' }`;
                    explorerUrl = '';
                    let evmscan = _config_1.$config.get(`blockchainExplorer.${opts.network}`);
                    if (evmscan?.www) {
                        explorerUrl = `${evmscan.www}/address/${opts.implementation}#code`;
                    }
                    break;
                }
                throw new Error(`Unknown network ${opts.network}, and no configuration found under "web3" field`);
            }
        }
        let storageReaderProperty = '';
        let storageReaderClass = '';
        try {
            let storageReaderGenerator = new GeneratorStorageReader_1.GeneratorStorageReader();
            let reader = await storageReaderGenerator.generate({ ...opts });
            let property = reader.className
                ? `storage = new ${reader.className}(this.address, this.client, this.explorer);`
                : '';
            storageReaderClass = reader.code;
            storageReaderProperty = property;
            _logger_1.$logger.log(`Storage Reader generated`);
        }
        catch (error) {
            _logger_1.$logger.log(`Storage Reader is skipped: ${error.message}`);
        }
        let code = template
            .replace(/\$Etherscan\$/g, EtherscanStr)
            .replace(/\$EthWeb3Client\$/g, EthWeb3ClientStr)
            .replace(/\$Web3ClientOptions\$/g, Web3ClientOptions)
            .replace(/\$EvmScanOptions\$/g, EvmScanOptions)
            .replace(`/* IMPORTS */`, imports.join('\n'))
            .replace(`$NAME$`, _gen_1.$gen.toClassName(name))
            .replace(`$ADDRESS$`, opts.address ?? '')
            .replace(`/* METHODS */`, methods)
            .replace(`/* EVENTS */`, events)
            .replace(`/* EVENTS_EXTRACTORS */`, eventsExtractors)
            .replace(`/* EVENTS_FETCHERS */`, eventsFetchers)
            .replace(`$ABI$`, JSON.stringify(abiJson))
            .replace(`$DATE$`, _date_1.$date.format(new Date(), 'yyyy-MM-dd HH:mm'))
            .replace(`$EXPLORER_URL$`, explorerUrl)
            .replace(`/* $EVENT_INTERFACES$ */`, eventInterfaces.join('\n') + '\n\n' + eventInterfacesAll.code + '\n\n')
            .replace(`/* STORAGE_READER_PROPERTY */`, storageReaderProperty)
            .replace(`/* STORAGE_READER_CLASS */`, storageReaderClass || '')
            .replace(`/* $METHOD_INTERFACES$ */`, methodInterfacesArr.map(x => x.code).join('\n\n') + '\n\n' + methodInterfacesAll.code + '\n\n');
        let directory = name;
        let filename = /[^\\/]+$/.exec(name)[0];
        let path = /\.ts$/.test(opts.output)
            ? opts.output
            : atma_utils_1.class_Uri.combine(opts.output, directory, `${filename}.ts`);
        await atma_io_1.File.writeAsync(path, code, { skipHooks: true });
        if (opts.saveAbi) {
            let path = atma_utils_1.class_Uri.combine(opts.output, directory, `${filename}.json`);
            await atma_io_1.File.writeAsync(path, abiJson);
        }
        _logger_1.$logger.log(`ABI wrapper class created: ${path}`);
        let sources = opts.sources;
        let sourceFiles = [];
        if (sources) {
            sourceFiles = await alot_1.default.fromObject(sources).mapAsync(async (entry) => {
                let sourceFilename = /\/?([^/]+$)/.exec(entry.key)[1];
                let path = atma_utils_1.class_Uri.combine(opts.output, directory, filename, sourceFilename);
                await atma_io_1.File.writeAsync(path, entry.value.content, { skipHooks: true });
                _logger_1.$logger.log(`Source code saved: ${path}`);
                return path;
            }).toArrayAsync();
        }
        return {
            main: path,
            sources: sourceFiles,
        };
    }
}
exports.GeneratorFromAbi = GeneratorFromAbi;
var Gen;
(function (Gen) {
    function serializeMethodTs(abi) {
        let isRead = isReader(abi);
        if (isRead) {
            return serializeReadMethodTs(abi);
        }
        return serializeWriteMethodTs(abi);
    }
    Gen.serializeMethodTs = serializeMethodTs;
    function serializeMethodTsOverloads(abis) {
        let isRead = abis.every(abi => isReader(abi));
        if (isRead) {
            return serializeReadMethodTsOverloads(abis);
        }
        return serializeWriteMethodTsOverloads(abis);
    }
    Gen.serializeMethodTsOverloads = serializeMethodTsOverloads;
    // abi.length > 1 if has method overloads
    function serializeMethodInterfacesTs(name, abis) {
        let args = abis.map(abi => {
            let { fnInputArguments } = serializeArgumentsTs(abi);
            return `[ ${fnInputArguments} ]`;
        }).join(' | ');
        let iface = `IMethod${name[0].toUpperCase()}${name.substring(1)}`;
        let code = [
            `interface ${iface} {`,
            `  method: "${name}"`,
            `  arguments: ${args}`,
            `}`
        ];
        return {
            method: name,
            interface: iface,
            code: code.join('\n')
        };
    }
    Gen.serializeMethodInterfacesTs = serializeMethodInterfacesTs;
    function serializeMethodInterfacesAllTs(methods) {
        let fields = methods.map(method => {
            return `  ${method.method}: ${method.interface}`;
        });
        let code = [
            `interface IMethods {`,
            ...fields,
            `  '*': { method: string, arguments: any[] } `,
            `}`
        ];
        return {
            code: code.join('\n')
        };
    }
    Gen.serializeMethodInterfacesAllTs = serializeMethodInterfacesAllTs;
    function serializeEventsInterfacesAllTs(events) {
        let fields = events.map(item => {
            return `  ${item.name}: TLog${item.name}Parameters`;
        });
        let code = [
            `interface IEvents {`,
            ...fields,
            `  '*': any[] `,
            `}`
        ];
        return {
            code: code.join('\n')
        };
    }
    Gen.serializeEventsInterfacesAllTs = serializeEventsInterfacesAllTs;
    function serializeEvent(abi) {
        let { fnInputArguments, callInputArguments, fnResult } = serializeArgumentsTs(abi);
        return `
            on${abi.name} (fn?: (event: TClientEventsStreamData<TLog${abi.name}Parameters>) => void): ClientEventsStream<TClientEventsStreamData<TLog${abi.name}Parameters>> {
                return this.$onLog('${abi.name}', fn);
            }
        `;
    }
    Gen.serializeEvent = serializeEvent;
    function serializeEventExtractor(abi) {
        return `
            extractLogs${abi.name} (tx: TransactionReceipt): ITxLogItem<TLog${abi.name}>[] {
                let abi = this.$getAbiItem('event', '${abi.name}');
                return this.$extractLogs(tx, abi) as any as ITxLogItem<TLog${abi.name}>[];
            }
        `;
    }
    Gen.serializeEventExtractor = serializeEventExtractor;
    function serializeEventFetcher(abi) {
        let inputs = abi.inputs;
        let indexed = (0, alot_1.default)(inputs).takeWhile(x => x.indexed).toArray();
        let indexedParams = indexed.map(param => `${param.name}?: ${_abiType_1.$abiType.getTsType(param.type, param)}`);
        return `
            async getPastLogs${abi.name} (options?: {
                fromBlock?: number | Date
                toBlock?: number | Date
                params?: { ${indexedParams} }
            }): Promise<ITxLogItem<TLog${abi.name}>[]> {
                let topic = '${_abiUtils_1.$abiUtils.getTopicSignature(abi)}';
                let abi = this.$getAbiItem('event', '${abi.name}');
                let filters = await this.$getPastLogsFilters(abi, {
                    topic,
                    ...options
                });
                let logs= await this.$getPastLogs(filters);
                return logs.map(log => this.$extractLog(log, abi)) as any;
            }
        `;
    }
    Gen.serializeEventFetcher = serializeEventFetcher;
    function serializeEventInterface(abi) {
        let { fnInputArguments, callInputArguments, fnResult } = serializeArgumentsTs(abi);
        return `
            type TLog${abi.name} = {
                ${fnInputArguments}
            };
            type TLog${abi.name}Parameters = [ ${fnInputArguments.replace('\n', '')} ];
        `;
    }
    Gen.serializeEventInterface = serializeEventInterface;
    function isReader(abi) {
        return ['view', 'pure', null].includes(abi.stateMutability);
    }
    Gen.isReader = isReader;
    function serializeMethodAbi(abi, includeNames) {
        let params = abi.inputs?.map(x => {
            let param = x.type;
            if (includeNames && x.name) {
                param += ' ' + x.name;
            }
            return param;
        }).join(', ') ?? '';
        let returns = serializeMethodAbiReturns(abi.outputs);
        if (returns && abi.outputs.length > 1) {
            returns = `(${returns})`;
        }
        let returnsStr = returns ? `returns ${returns}` : '';
        return `function ${abi.name}(${params}) ${returnsStr}`.trim();
    }
    Gen.serializeMethodAbi = serializeMethodAbi;
    function serializeReadMethodTs(abi) {
        let { fnInputArguments, callInputArguments, fnResult } = serializeArgumentsTs(abi);
        if (callInputArguments) {
            callInputArguments = `, ${callInputArguments}`;
        }
        return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (${fnInputArguments}): ${fnResult} {
                return this.$read('${serializeMethodAbi(abi)}'${callInputArguments});
            }
        `;
    }
    function serializeReadMethodTsOverloads(abis) {
        let overrides = abis.map(abi => {
            let { fnInputArguments, fnResult } = serializeArgumentsTs(abi);
            return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (${fnInputArguments}): ${fnResult}
            `;
        }).join('\n');
        let abi = abis[0];
        let { fnResult } = serializeArgumentsTs(abi);
        let sigs = abis.map(abi => serializeMethodAbi(abi)).map(x => `'${x}'`).join(', ');
        return `
            ${overrides}
            async ${abi.name} (...args): ${fnResult} {
                let abi = this.$getAbiItemOverload([ ${sigs} ], args);
                return this.$read(abi, ...args);
            }
        `;
    }
    function serializeWriteMethodTs(abi) {
        let { fnInputArguments, callInputArguments } = serializeArgumentsTs(abi);
        if (callInputArguments) {
            callInputArguments = `, ${callInputArguments}`;
        }
        return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (sender: TSender, ${fnInputArguments}): Promise<TxWriter> {
                return this.$write(this.$getAbiItem('function', '${abi.name}'), sender${callInputArguments});
            }
        `;
    }
    function serializeWriteMethodTsOverloads(abis) {
        let overrides = abis.map(abi => {
            let { fnInputArguments, fnResult } = serializeArgumentsTs(abi);
            return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (sender: TSender, ${fnInputArguments}): Promise<TxWriter>
            `;
        }).join('\n');
        let abi = abis[0];
        let sigs = abis.map(abi => serializeMethodAbi(abi)).map(x => `'${x}'`).join(', ');
        return `
            ${overrides}
            async ${abi.name} (sender: TSender, ...args): Promise<TxWriter> {
                let abi = this.$getAbiItemOverload([ ${sigs} ], args);
                return this.$write(abi, sender, ...args);
            }
        `;
    }
    function serializeArgumentsTs(abi) {
        let inputs = abi.inputs.map((input, i) => {
            let result = { ...input };
            if (result.name == null || result.name === '') {
                result.name = 'input' + i;
            }
            if (result.name === 'sender') {
                result.name = '_sender';
            }
            return result;
        });
        let fnInputArguments = inputs
            ?.map((input) => {
            let tsType = _abiType_1.$abiType.getTsType(input.type, input);
            if (tsType == null) {
                throw new Error(`Unknown abi type in arguments: ${input.type}`);
            }
            return `${input.name}: ${tsType}`;
        })
            ?.join(', ') ?? '';
        let callInputArguments = inputs
            ?.map(input => {
            return `${input.name}`;
        })
            ?.join(', ') ?? '';
        let fnResult = serializeMethodTsReturns(abi.outputs);
        return { fnInputArguments, callInputArguments, fnResult };
    }
    function isObjectParams(params) {
        return params?.every(x => Boolean(x.name));
    }
    function serializeMethodAbiReturns(params) {
        if (params == null) {
            return '';
        }
        // if (isObjectParams(params)) {
        //     return params.map(x => serializeMethodAbiReturnsSingle(x)).join(',');
        // }
        return params?.map(x => serializeMethodAbiReturnsSingle(x)).join(',');
    }
    function serializeMethodAbiReturnsSingle(param) {
        if (param == null) {
            return null;
        }
        if (param.components) {
            // tuple, tuple[]
            let fields = serializeMethodAbiReturns(param.components);
            return `[${fields}]${param.type === 'tuple[]' ? '[]' : ''}`;
        }
        // if (param.name && param.type) {
        //     return `${param.type} ${param.name}`;
        // }
        return param.type;
    }
    function serializeMethodTsReturns(params) {
        if (params == null || params.length === 0) {
            params = [{ name: '', type: 'uint256' }];
        }
        let tsTypes = params.map(param => {
            let tsType = _abiType_1.$abiType.getTsType(param.type, param);
            if (tsType == null) {
                throw new Error(`(gen) Unknown abi type in return: ${param.type}`);
            }
            return {
                name: param.name,
                type: tsType
            };
        });
        if (params.length > 1 && isObjectParams(params)) {
            let paramsStr = tsTypes.map(x => `${x.name}: ${x.type}`).join(', ');
            return `Promise<{ ${paramsStr} }>`;
        }
        let fnResult = tsTypes?.map(x => x.type).join(', ');
        if (tsTypes.length > 1) {
            fnResult = `[ ${fnResult} ]`;
        }
        return `Promise<${fnResult}>`;
    }
    // const AbiTsTypes = {
    //     'uint8': 'number',
    //     'uint4': 'number',
    //     'uint': 'number',
    //     'bool': 'boolean',
    //     'bytes': 'Buffer',
    //     'bytes4': 'Buffer',
    //     'bytes32': 'Buffer',
    //     'bytes64': 'Buffer',
    //     'bytes128': 'Buffer',
    //     'bytes256': 'Buffer',
    //     'address': 'TAddress',
    //     'string': 'string',
    // };
    // const AbiTsTypesRgx = [
    //     {
    //         rgx: /uint\d+/,
    //         type: 'bigint',
    //     }
    // ];
})(Gen || (Gen = {}));
