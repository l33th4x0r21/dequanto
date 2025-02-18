/**
 *  AUTO-Generated Class: 2024-05-17 00:25
 *  Implementation: https://etherscan.io/address/undefined#code
 */
import di from 'a-di';
import { TAddress } from '@dequanto/models/TAddress';
import { TAccount } from '@dequanto/models/TAccount';
import { TBufferLike } from '@dequanto/models/TBufferLike';
import { ClientEventsStream, TClientEventsStreamData } from '@dequanto/clients/ClientEventsStream';
import { ContractBase } from '@dequanto/contracts/ContractBase';
import { ContractBaseUtils } from '@dequanto/contracts/utils/ContractBaseUtils';
import { ContractStorageReaderBase } from '@dequanto/contracts/ContractStorageReaderBase';
import { TxWriter } from '@dequanto/txs/TxWriter';
import { ITxLogItem } from '@dequanto/txs/receipt/ITxLogItem';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { IBlockChainExplorer } from '@dequanto/explorer/IBlockChainExplorer';
import { SubjectStream } from '@dequanto/class/SubjectStream';


import type { ContractWriter } from '@dequanto/contracts/ContractWriter';
import type { TAbiItem } from '@dequanto/types/TAbi';
import type { TEth } from '@dequanto/models/TEth';
import type { TOverrideReturns } from '@dequanto/utils/types';


import { Etherscan } from '@dequanto/explorer/Etherscan'
import { EthWeb3Client } from '@dequanto/clients/EthWeb3Client'



export class IERC5805 extends ContractBase {
    constructor(
        public address: TEth.Address = null,
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)

        
    }

    Types: TIERC5805Types;

    $meta = {
        "class": "./src/prebuilt/openzeppelin/IERC5805.ts"
    }

    // 0x4bf5d7e9
    async CLOCK_MODE (): Promise<string> {
        return this.$read(this.$getAbiItem('function', 'CLOCK_MODE'));
    }

    // 0x91ddadf4
    async clock (): Promise<number> {
        return this.$read(this.$getAbiItem('function', 'clock'));
    }

    // 0x5c19a95c
    async delegate (sender: TSender, delegatee: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'delegate'), sender, delegatee);
    }

    // 0xc3cda520
    async delegateBySig (sender: TSender, delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TEth.Hex, s: TEth.Hex): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'delegateBySig'), sender, delegatee, nonce, expiry, v, r, s);
    }

    // 0x587cde1e
    async delegates (account: TAddress): Promise<TAddress> {
        return this.$read(this.$getAbiItem('function', 'delegates'), account);
    }

    // 0x8e539e8c
    async getPastTotalSupply (timepoint: bigint): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getPastTotalSupply'), timepoint);
    }

    // 0x3a46b1a8
    async getPastVotes (account: TAddress, timepoint: bigint): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getPastVotes'), account, timepoint);
    }

    // 0x9ab24eb0
    async getVotes (account: TAddress): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getVotes'), account);
    }

    $call () {
        return super.$call() as IIERC5805TxCaller;
    }
    $signed (): TOverrideReturns<IIERC5805TxCaller, Promise<{ signed: TEth.Hex, error?: Error & { data?: { type: string, params } } }>> {
        return super.$signed() as any;
    }
    $data (): IIERC5805TxData {
        return super.$data() as IIERC5805TxData;
    }
    $gas (): TOverrideReturns<IIERC5805TxCaller, Promise<{ gas?: bigint, price?: bigint, error?: Error & { data?: { type: string, params } } }>> {
        return super.$gas() as any;
    }

    onTransaction <TMethod extends keyof TIERC5805Types['Methods']> (method: TMethod, options: Parameters<ContractBase['$onTransaction']>[0]): SubjectStream<{
        tx: TEth.Tx
        block: TEth.Block<TEth.Hex>
        calldata: {
            method: TMethod
            arguments: TIERC5805Types['Methods'][TMethod]['arguments']
        }
    }> {
        options ??= {};
        options.filter ??= {};
        options.filter.method = method;
        return <any> this.$onTransaction(options);
    }

    onLog (event: keyof TEvents, cb?: (event: TClientEventsStreamData) => void): ClientEventsStream<TClientEventsStreamData> {
        return this.$onLog(event, cb);
    }

    async getPastLogs <TEventName extends keyof TEvents> (
        events: TEventName[]
        , options?: TEventLogOptions<TEventParams<TEventName>>
    ): Promise<ITxLogItem<TEventParams<TEventName>, TEventName>[]>
    async getPastLogs <TEventName extends keyof TEvents> (
        event: TEventName
        , options?: TEventLogOptions<TEventParams<TEventName>>
    ): Promise<ITxLogItem<TEventParams<TEventName>, TEventName>[]>
    async getPastLogs (mix: any, options?): Promise<any> {
        return await super.getPastLogs(mix, options) as any;
    }

    onDelegateChanged (fn?: (event: TClientEventsStreamData<TEventArguments<'DelegateChanged'>>) => void): ClientEventsStream<TClientEventsStreamData<TEventArguments<'DelegateChanged'>>> {
        return this.$onLog('DelegateChanged', fn);
    }

    onDelegateVotesChanged (fn?: (event: TClientEventsStreamData<TEventArguments<'DelegateVotesChanged'>>) => void): ClientEventsStream<TClientEventsStreamData<TEventArguments<'DelegateVotesChanged'>>> {
        return this.$onLog('DelegateVotesChanged', fn);
    }

    extractLogsDelegateChanged (tx: TEth.TxReceipt): ITxLogItem<TEventParams<'DelegateChanged'>>[] {
        let abi = this.$getAbiItem('event', 'DelegateChanged');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TEventParams<'DelegateChanged'>>[];
    }

    extractLogsDelegateVotesChanged (tx: TEth.TxReceipt): ITxLogItem<TEventParams<'DelegateVotesChanged'>>[] {
        let abi = this.$getAbiItem('event', 'DelegateVotesChanged');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TEventParams<'DelegateVotesChanged'>>[];
    }

    async getPastLogsDelegateChanged (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { delegator?: TAddress,fromDelegate?: TAddress,toDelegate?: TAddress }
    }): Promise<ITxLogItem<TEventParams<'DelegateChanged'>>[]> {
        return await this.$getPastLogsParsed('DelegateChanged', options) as any;
    }

    async getPastLogsDelegateVotesChanged (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { delegate?: TAddress }
    }): Promise<ITxLogItem<TEventParams<'DelegateVotesChanged'>>[]> {
        return await this.$getPastLogsParsed('DelegateVotesChanged', options) as any;
    }

    abi: TAbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"inputs":[],"name":"CLOCK_MODE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clock","outputs":[{"internalType":"uint48","name":"","type":"uint48"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timepoint","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timepoint","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

type TEventLogOptions<TParams> = {
    fromBlock?: number | Date
    toBlock?: number | Date
    params?: TParams
}

export type TIERC5805Types = {
    Events: {
        DelegateChanged: {
            outputParams: { delegator: TAddress, fromDelegate: TAddress, toDelegate: TAddress },
            outputArgs:   [ delegator: TAddress, fromDelegate: TAddress, toDelegate: TAddress ],
        }
        DelegateVotesChanged: {
            outputParams: { delegate: TAddress, previousBalance: bigint, newBalance: bigint },
            outputArgs:   [ delegate: TAddress, previousBalance: bigint, newBalance: bigint ],
        }
    },
    Methods: {
        CLOCK_MODE: {
          method: "CLOCK_MODE"
          arguments: [  ]
        }
        clock: {
          method: "clock"
          arguments: [  ]
        }
        delegate: {
          method: "delegate"
          arguments: [ delegatee: TAddress ]
        }
        delegateBySig: {
          method: "delegateBySig"
          arguments: [ delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TEth.Hex, s: TEth.Hex ]
        }
        delegates: {
          method: "delegates"
          arguments: [ account: TAddress ]
        }
        getPastTotalSupply: {
          method: "getPastTotalSupply"
          arguments: [ timepoint: bigint ]
        }
        getPastVotes: {
          method: "getPastVotes"
          arguments: [ account: TAddress, timepoint: bigint ]
        }
        getVotes: {
          method: "getVotes"
          arguments: [ account: TAddress ]
        }
    }
}



interface IIERC5805TxCaller {
    delegate (sender: TSender, delegatee: TAddress): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    delegateBySig (sender: TSender, delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TEth.Hex, s: TEth.Hex): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
}


interface IIERC5805TxData {
    delegate (sender: TSender, delegatee: TAddress): Promise<TEth.TxLike>
    delegateBySig (sender: TSender, delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TEth.Hex, s: TEth.Hex): Promise<TEth.TxLike>
}


type TEvents = TIERC5805Types['Events'];
type TEventParams<TEventName extends keyof TEvents> = Partial<TEvents[TEventName]['outputParams']>;
type TEventArguments<TEventName extends keyof TEvents> = Partial<TEvents[TEventName]['outputArgs']>;
