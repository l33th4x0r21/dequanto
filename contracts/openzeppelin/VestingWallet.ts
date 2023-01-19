/**
 *  AUTO-Generated Class: 2023-01-19 12:43
 *  Implementation: https://etherscan.io/address/undefined#code
 */
import di from 'a-di';
import { TAddress } from '@dequanto/models/TAddress';
import { TAccount } from '@dequanto/models/TAccount';
import { TBufferLike } from '@dequanto/models/TBufferLike';
import { ClientEventsStream, TClientEventsStreamData } from '@dequanto/clients/ClientEventsStream';
import { ContractBase } from '@dequanto/contracts/ContractBase';
import { ContractStorageReaderBase } from '@dequanto/contracts/ContractStorageReaderBase';
import { type AbiItem } from 'web3-utils';
import type { BlockTransactionString } from 'web3-eth';
import { TransactionReceipt, Transaction, EventLog } from 'web3-core';
import { TxWriter } from '@dequanto/txs/TxWriter';
import { ITxLogItem } from '@dequanto/txs/receipt/ITxLogItem';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { IBlockChainExplorer } from '@dequanto/BlockchainExplorer/IBlockChainExplorer';
import { SubjectStream } from '@dequanto/class/SubjectStream';



import { Etherscan } from '@dequanto/BlockchainExplorer/Etherscan'
import { EthWeb3Client } from '@dequanto/clients/EthWeb3Client'
export class VestingWallet extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0x38af3eed
    async beneficiary (): Promise<TAddress> {
        return this.$read('function beneficiary() returns address');
    }

    // 0x0fb5a6b4
    async duration (): Promise<bigint> {
        return this.$read('function duration() returns uint256');
    }

    // 0x19165587
    async release (sender: TSender, token: TAddress): Promise<TxWriter>
    // 0x86d1a69f
    async release (sender: TSender, ): Promise<TxWriter>
    async release (sender: TSender, ...args): Promise<TxWriter> {
        let abi = this.$getAbiItemOverload([ 'function release(address)', 'function release()' ], args);
        return this.$write(abi, sender, ...args);
    }

    // 0x96132521
    async released (): Promise<bigint>
    // 0x9852595c
    async released (token: TAddress): Promise<bigint>
    async released (...args): Promise<bigint> {
        let abi = this.$getAbiItemOverload([ 'function released() returns uint256', 'function released(address) returns uint256' ], args);
        return this.$read(abi, ...args);
    }

    // 0xbe9a6555
    async start (): Promise<bigint> {
        return this.$read('function start() returns uint256');
    }

    // 0x0a17b06b
    async vestedAmount (timestamp: number): Promise<bigint>
    // 0x810ec23b
    async vestedAmount (token: TAddress, timestamp: number): Promise<bigint>
    async vestedAmount (...args): Promise<bigint> {
        let abi = this.$getAbiItemOverload([ 'function vestedAmount(uint64) returns uint256', 'function vestedAmount(address, uint64) returns uint256' ], args);
        return this.$read(abi, ...args);
    }

    onTransaction <TMethod extends keyof IMethods> (method: TMethod, options: Parameters<ContractBase['$onTransaction']>[0]): SubjectStream<{
        tx: Transaction
        block: BlockTransactionString
        calldata: IMethods[TMethod]
    }> {
        options ??= {};
        options.filter ??= {};
        options.filter.method = <any> method;
        return <any> this.$onTransaction(options);
    }

    onLog (event: keyof IEvents, cb?: (event: TClientEventsStreamData) => void): ClientEventsStream<TClientEventsStreamData> {
        return this.$onLog(event, cb);
    }

    onERC20Released (fn?: (event: TClientEventsStreamData<TLogERC20ReleasedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogERC20ReleasedParameters>> {
        return this.$onLog('ERC20Released', fn);
    }

    onEtherReleased (fn?: (event: TClientEventsStreamData<TLogEtherReleasedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogEtherReleasedParameters>> {
        return this.$onLog('EtherReleased', fn);
    }

    extractLogsERC20Released (tx: TransactionReceipt): ITxLogItem<TLogERC20Released>[] {
        let abi = this.$getAbiItem('event', 'ERC20Released');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogERC20Released>[];
    }

    extractLogsEtherReleased (tx: TransactionReceipt): ITxLogItem<TLogEtherReleased>[] {
        let abi = this.$getAbiItem('event', 'EtherReleased');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogEtherReleased>[];
    }

    async getPastLogsERC20Released (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { token?: TAddress }
    }): Promise<ITxLogItem<TLogERC20Released>[]> {
        let topic = '0xc0e523490dd523c33b1878c9eb14ff46991e3f5b2cd33710918618f2a39cba1b';
        let abi = this.$getAbiItem('event', 'ERC20Released');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsEtherReleased (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: {  }
    }): Promise<ITxLogItem<TLogEtherReleased>[]> {
        let topic = '0xda9d4e5f101b8b9b1c5b76d0c5a9f7923571acfc02376aa076b75a8c080c956b';
        let abi = this.$getAbiItem('event', 'EtherReleased');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    abi: AbiItem[] = [{"inputs":[{"internalType":"address","name":"beneficiaryAddress","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"uint64","name":"durationSeconds","type":"uint64"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC20Released","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EtherReleased","type":"event"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"released","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"released","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"start","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"vestedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint64","name":"timestamp","type":"uint64"}],"name":"vestedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogERC20Released = {
        token: TAddress, amount: bigint
    };
    type TLogERC20ReleasedParameters = [ token: TAddress, amount: bigint ];
    type TLogEtherReleased = {
        amount: bigint
    };
    type TLogEtherReleasedParameters = [ amount: bigint ];

interface IEvents {
  ERC20Released: TLogERC20ReleasedParameters
  EtherReleased: TLogEtherReleasedParameters
  '*': any[] 
}



interface IMethodBeneficiary {
  method: "beneficiary"
  arguments: [  ]
}

interface IMethodDuration {
  method: "duration"
  arguments: [  ]
}

interface IMethodRelease {
  method: "release"
  arguments: [ token: TAddress ] | [  ]
}

interface IMethodReleased {
  method: "released"
  arguments: [  ] | [ token: TAddress ]
}

interface IMethodStart {
  method: "start"
  arguments: [  ]
}

interface IMethodVestedAmount {
  method: "vestedAmount"
  arguments: [ timestamp: number ] | [ token: TAddress, timestamp: number ]
}

interface IMethods {
  beneficiary: IMethodBeneficiary
  duration: IMethodDuration
  release: IMethodRelease
  released: IMethodReleased
  start: IMethodStart
  vestedAmount: IMethodVestedAmount
  '*': { method: string, arguments: any[] } 
}





