import { class_Uri } from 'atma-utils';
import { $config } from './$config';

export namespace $path {
    let root: string = null;

    /*** Gets dequanto root path (cwd or npm global modules) */
    export function resolve (path: string) {
        return class_Uri.combine(root ?? (root = getRoot()), path)
    }
    export function isAbsolute(path: string) {
        if (path[0] === '/') {
            return true;
        }
        let hasProtocol = /^[\w]{2,5}:[\\\/]{2,}/.test(path);
        if (hasProtocol) {
            return true;
        }
        return false;
    }
    export function hasExt (path: string) {
        return /\.\w+($|\?)/.test(path);
    }
    export function normalize (path: string) {
        return path.replace(/\\/g, '/').replace(/\/.\//g, '/');
    }

    function getRoot () {
        let base = $config.get('settings.base');
        if (base != null) {
            let cwd = process.cwd();
            return class_Uri.combine('file://' + cwd, base);
        }

        let uri = new class_Uri('file://' + __dirname + '/');
        while (true) {
            let dir = getDirName(uri.path);
            if (!dir || dir === '/') {
                throw new Error(`Root path not resolved: ${__dirname}`);
            }
            if (dir === 'lib' || dir === 'src') {
                uri = uri.cdUp();
                let path = uri.toString();
                if (/dequanto/.test(path) === false) {
                    path = uri.combine('dequanto').toString();
                }
                return path;
            }
            uri = uri.cdUp();
        }
    }
    function getDirName (path: string) {
        return /\/?([^\/]+)\/?$/.exec(path)?.[1];
    }
}
