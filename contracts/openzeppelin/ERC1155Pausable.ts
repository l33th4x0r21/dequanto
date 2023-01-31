/**
 *  AUTO-Generated Class: 2023-01-31 13:27
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
export class ERC1155Pausable extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0x00fdd58e
    async balanceOf (account: TAddress, id: bigint): Promise<bigint> {
        return this.$read('function balanceOf(address, uint256) returns uint256', account, id);
    }

    // 0x4e1273f4
    async balanceOfBatch (accounts: TAddress[], ids: bigint[]): Promise<bigint[]> {
        return this.$read('function balanceOfBatch(address[], uint256[]) returns uint256[]', accounts, ids);
    }

    // 0xe985e9c5
    async isApprovedForAll (account: TAddress, operator: TAddress): Promise<boolean> {
        return this.$read('function isApprovedForAll(address, address) returns bool', account, operator);
    }

    // 0x5c975abb
    async paused (): Promise<boolean> {
        return this.$read('function paused() returns bool');
    }

    // 0x2eb2c2d6
    async safeBatchTransferFrom (sender: TSender, from: TAddress, to: TAddress, ids: bigint[], amounts: bigint[], data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'safeBatchTransferFrom'), sender, from, to, ids, amounts, data);
    }

    // 0xf242432a
    async safeTransferFrom (sender: TSender, from: TAddress, to: TAddress, id: bigint, amount: bigint, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'safeTransferFrom'), sender, from, to, id, amount, data);
    }

    // 0xa22cb465
    async setApprovalForAll (sender: TSender, operator: TAddress, approved: boolean): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'setApprovalForAll'), sender, operator, approved);
    }

    // 0x01ffc9a7
    async supportsInterface (interfaceId: TBufferLike): Promise<boolean> {
        return this.$read('function supportsInterface(bytes4) returns bool', interfaceId);
    }

    // 0x0e89341c
    async uri (input0: bigint): Promise<string> {
        return this.$read('function uri(uint256) returns string', input0);
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

    onApprovalForAll (fn?: (event: TClientEventsStreamData<TLogApprovalForAllParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogApprovalForAllParameters>> {
        return this.$onLog('ApprovalForAll', fn);
    }

    onPaused (fn?: (event: TClientEventsStreamData<TLogPausedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogPausedParameters>> {
        return this.$onLog('Paused', fn);
    }

    onTransferBatch (fn?: (event: TClientEventsStreamData<TLogTransferBatchParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogTransferBatchParameters>> {
        return this.$onLog('TransferBatch', fn);
    }

    onTransferSingle (fn?: (event: TClientEventsStreamData<TLogTransferSingleParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogTransferSingleParameters>> {
        return this.$onLog('TransferSingle', fn);
    }

    onURI (fn?: (event: TClientEventsStreamData<TLogURIParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogURIParameters>> {
        return this.$onLog('URI', fn);
    }

    onUnpaused (fn?: (event: TClientEventsStreamData<TLogUnpausedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogUnpausedParameters>> {
        return this.$onLog('Unpaused', fn);
    }

    extractLogsApprovalForAll (tx: TransactionReceipt): ITxLogItem<TLogApprovalForAll>[] {
        let abi = this.$getAbiItem('event', 'ApprovalForAll');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogApprovalForAll>[];
    }

    extractLogsPaused (tx: TransactionReceipt): ITxLogItem<TLogPaused>[] {
        let abi = this.$getAbiItem('event', 'Paused');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogPaused>[];
    }

    extractLogsTransferBatch (tx: TransactionReceipt): ITxLogItem<TLogTransferBatch>[] {
        let abi = this.$getAbiItem('event', 'TransferBatch');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogTransferBatch>[];
    }

    extractLogsTransferSingle (tx: TransactionReceipt): ITxLogItem<TLogTransferSingle>[] {
        let abi = this.$getAbiItem('event', 'TransferSingle');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogTransferSingle>[];
    }

    extractLogsURI (tx: TransactionReceipt): ITxLogItem<TLogURI>[] {
        let abi = this.$getAbiItem('event', 'URI');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogURI>[];
    }

    extractLogsUnpaused (tx: TransactionReceipt): ITxLogItem<TLogUnpaused>[] {
        let abi = this.$getAbiItem('event', 'Unpaused');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogUnpaused>[];
    }

    async getPastLogsApprovalForAll (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { account?: TAddress,operator?: TAddress }
    }): Promise<ITxLogItem<TLogApprovalForAll>[]> {
        let topic = '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31';
        let abi = this.$getAbiItem('event', 'ApprovalForAll');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsPaused (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: {  }
    }): Promise<ITxLogItem<TLogPaused>[]> {
        let topic = '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258';
        let abi = this.$getAbiItem('event', 'Paused');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsTransferBatch (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { operator?: TAddress,from?: TAddress,to?: TAddress }
    }): Promise<ITxLogItem<TLogTransferBatch>[]> {
        let topic = '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb';
        let abi = this.$getAbiItem('event', 'TransferBatch');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsTransferSingle (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { operator?: TAddress,from?: TAddress,to?: TAddress }
    }): Promise<ITxLogItem<TLogTransferSingle>[]> {
        let topic = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62';
        let abi = this.$getAbiItem('event', 'TransferSingle');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsURI (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: {  }
    }): Promise<ITxLogItem<TLogURI>[]> {
        let topic = '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b';
        let abi = this.$getAbiItem('event', 'URI');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsUnpaused (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: {  }
    }): Promise<ITxLogItem<TLogUnpaused>[]> {
        let topic = '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa';
        let abi = this.$getAbiItem('event', 'Unpaused');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    abi: AbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogApprovalForAll = {
        account: TAddress, operator: TAddress, approved: boolean
    };
    type TLogApprovalForAllParameters = [ account: TAddress, operator: TAddress, approved: boolean ];
    type TLogPaused = {
        account: TAddress
    };
    type TLogPausedParameters = [ account: TAddress ];
    type TLogTransferBatch = {
        operator: TAddress, from: TAddress, to: TAddress, ids: bigint[], values: bigint[]
    };
    type TLogTransferBatchParameters = [ operator: TAddress, from: TAddress, to: TAddress, ids: bigint[], values: bigint[] ];
    type TLogTransferSingle = {
        operator: TAddress, from: TAddress, to: TAddress, id: bigint, value: bigint
    };
    type TLogTransferSingleParameters = [ operator: TAddress, from: TAddress, to: TAddress, id: bigint, value: bigint ];
    type TLogURI = {
        value: string, id: bigint
    };
    type TLogURIParameters = [ value: string, id: bigint ];
    type TLogUnpaused = {
        account: TAddress
    };
    type TLogUnpausedParameters = [ account: TAddress ];

interface IEvents {
  ApprovalForAll: TLogApprovalForAllParameters
  Paused: TLogPausedParameters
  TransferBatch: TLogTransferBatchParameters
  TransferSingle: TLogTransferSingleParameters
  URI: TLogURIParameters
  Unpaused: TLogUnpausedParameters
  '*': any[] 
}



interface IMethodBalanceOf {
  method: "balanceOf"
  arguments: [ account: TAddress, id: bigint ]
}

interface IMethodBalanceOfBatch {
  method: "balanceOfBatch"
  arguments: [ accounts: TAddress[], ids: bigint[] ]
}

interface IMethodIsApprovedForAll {
  method: "isApprovedForAll"
  arguments: [ account: TAddress, operator: TAddress ]
}

interface IMethodPaused {
  method: "paused"
  arguments: [  ]
}

interface IMethodSafeBatchTransferFrom {
  method: "safeBatchTransferFrom"
  arguments: [ from: TAddress, to: TAddress, ids: bigint[], amounts: bigint[], data: TBufferLike ]
}

interface IMethodSafeTransferFrom {
  method: "safeTransferFrom"
  arguments: [ from: TAddress, to: TAddress, id: bigint, amount: bigint, data: TBufferLike ]
}

interface IMethodSetApprovalForAll {
  method: "setApprovalForAll"
  arguments: [ operator: TAddress, approved: boolean ]
}

interface IMethodSupportsInterface {
  method: "supportsInterface"
  arguments: [ interfaceId: TBufferLike ]
}

interface IMethodUri {
  method: "uri"
  arguments: [ input0: bigint ]
}

interface IMethods {
  balanceOf: IMethodBalanceOf
  balanceOfBatch: IMethodBalanceOfBatch
  isApprovedForAll: IMethodIsApprovedForAll
  paused: IMethodPaused
  safeBatchTransferFrom: IMethodSafeBatchTransferFrom
  safeTransferFrom: IMethodSafeTransferFrom
  setApprovalForAll: IMethodSetApprovalForAll
  supportsInterface: IMethodSupportsInterface
  uri: IMethodUri
  '*': { method: string, arguments: any[] } 
}





