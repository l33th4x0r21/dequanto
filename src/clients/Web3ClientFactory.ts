import di from 'a-di';
import { TPlatform } from '@dequanto/models/TPlatform';
import { BscWeb3Client } from './BscWeb3Client';
import { EthWeb3Client } from './EthWeb3Client';
import { IWeb3EndpointOptions } from './interfaces/IWeb3EndpointOptions';
import { PolyWeb3Client } from './PolyWeb3Client';
import { ArbWeb3Client } from '@dequanto/chains/arbitrum/ArbWeb3Client';
import { XDaiWeb3Client } from '@dequanto/chains/xdai/XDaiWeb3Client';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { Config, config } from '@dequanto/config/Config';
import { EvmWeb3Client } from './EvmWeb3Client';
import alot from 'alot';

export namespace Web3ClientFactory {

    export function get (platform: TPlatform | string | number, opts?: IWeb3EndpointOptions) {
        if (typeof platform ==='number') {
            let chain = alot.fromObject(config.web3).find(x => x.value.chainId === platform);
            if (chain == null) {
                throw new Error(`Unsupported platform ${platform} for web3 client`);
            }
            platform = chain.key
        }

        switch (platform) {
            case 'bsc':
                return di.resolve(BscWeb3Client, opts);
            case 'eth':
                return di.resolve(EthWeb3Client, opts);
            case 'eth:goerli':
                return di.resolve(EthWeb3Client, {
                    platform: platform,
                    chainId: 5,
                    ...(opts ?? {})
                });
            case 'polygon':
                return di.resolve(PolyWeb3Client, opts);
            case 'arbitrum':
                return di.resolve(ArbWeb3Client, opts);
            case 'xdai':
                return di.resolve(XDaiWeb3Client, opts);
            case 'hardhat':
                return di.resolve(HardhatProvider).client('localhost', opts);
            default:
                let cfg = config.web3[platform];
                if (cfg != null) {
                    return new EvmWeb3Client({ platform, ...cfg });
                }
                throw new Error(`Unsupported platform ${platform} for web3 client`);
        }
    }

    /** Same as sync variation, but ensures the config is being fetched */
    export async function getAsync (platform: TPlatform | string | number, opts?: IWeb3EndpointOptions) {
        let cfg = await Config.get();
        return get(platform, opts);
    }
}
