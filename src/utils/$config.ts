import { config } from '@dequanto/Config';
import { obj_getProperty } from 'atma-utils';

declare var app;

export namespace $config {
    export function get <T = any> (path: string, $default?: T): T {
        let value = (typeof app !== 'undefined' ? app?.config?.$get?.(path) : null)
            ?? obj_getProperty(config, path)
            ?? $default;

        if (value == null) {
            //-throw new Error(`Config data is undefined for ${path}`);
        }
        return value;
    }
}
