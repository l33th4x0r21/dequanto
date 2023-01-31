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
export class ConditionalEscrow extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0xf340fa01
    async deposit (sender: TSender, payee: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'deposit'), sender, payee);
    }

    // 0xe3a9db1a
    async depositsOf (payee: TAddress): Promise<bigint> {
        return this.$read('function depositsOf(address) returns uint256', payee);
    }

    // 0x8da5cb5b
    async owner (): Promise<TAddress> {
        return this.$read('function owner() returns address');
    }

    // 0x715018a6
    async renounceOwnership (sender: TSender, ): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'renounceOwnership'), sender);
    }

    // 0xf2fde38b
    async transferOwnership (sender: TSender, newOwner: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'transferOwnership'), sender, newOwner);
    }

    // 0x51cff8d9
    async withdraw (sender: TSender, payee: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'withdraw'), sender, payee);
    }

    // 0x685ca194
    async withdrawalAllowed (payee: TAddress): Promise<boolean> {
        return this.$read('function withdrawalAllowed(address) returns bool', payee);
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

    onDeposited (fn?: (event: TClientEventsStreamData<TLogDepositedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogDepositedParameters>> {
        return this.$onLog('Deposited', fn);
    }

    onOwnershipTransferred (fn?: (event: TClientEventsStreamData<TLogOwnershipTransferredParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogOwnershipTransferredParameters>> {
        return this.$onLog('OwnershipTransferred', fn);
    }

    onWithdrawn (fn?: (event: TClientEventsStreamData<TLogWithdrawnParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogWithdrawnParameters>> {
        return this.$onLog('Withdrawn', fn);
    }

    extractLogsDeposited (tx: TransactionReceipt): ITxLogItem<TLogDeposited>[] {
        let abi = this.$getAbiItem('event', 'Deposited');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogDeposited>[];
    }

    extractLogsOwnershipTransferred (tx: TransactionReceipt): ITxLogItem<TLogOwnershipTransferred>[] {
        let abi = this.$getAbiItem('event', 'OwnershipTransferred');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogOwnershipTransferred>[];
    }

    extractLogsWithdrawn (tx: TransactionReceipt): ITxLogItem<TLogWithdrawn>[] {
        let abi = this.$getAbiItem('event', 'Withdrawn');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogWithdrawn>[];
    }

    async getPastLogsDeposited (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { payee?: TAddress }
    }): Promise<ITxLogItem<TLogDeposited>[]> {
        let topic = '0x2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4';
        let abi = this.$getAbiItem('event', 'Deposited');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsOwnershipTransferred (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { previousOwner?: TAddress,newOwner?: TAddress }
    }): Promise<ITxLogItem<TLogOwnershipTransferred>[]> {
        let topic = '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0';
        let abi = this.$getAbiItem('event', 'OwnershipTransferred');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsWithdrawn (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { payee?: TAddress }
    }): Promise<ITxLogItem<TLogWithdrawn>[]> {
        let topic = '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5';
        let abi = this.$getAbiItem('event', 'Withdrawn');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    abi: AbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payee","type":"address"},{"indexed":false,"internalType":"uint256","name":"weiAmount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payee","type":"address"},{"indexed":false,"internalType":"uint256","name":"weiAmount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"payee","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"payee","type":"address"}],"name":"depositsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"payee","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"payee","type":"address"}],"name":"withdrawalAllowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogDeposited = {
        payee: TAddress, weiAmount: bigint
    };
    type TLogDepositedParameters = [ payee: TAddress, weiAmount: bigint ];
    type TLogOwnershipTransferred = {
        previousOwner: TAddress, newOwner: TAddress
    };
    type TLogOwnershipTransferredParameters = [ previousOwner: TAddress, newOwner: TAddress ];
    type TLogWithdrawn = {
        payee: TAddress, weiAmount: bigint
    };
    type TLogWithdrawnParameters = [ payee: TAddress, weiAmount: bigint ];

interface IEvents {
  Deposited: TLogDepositedParameters
  OwnershipTransferred: TLogOwnershipTransferredParameters
  Withdrawn: TLogWithdrawnParameters
  '*': any[] 
}



interface IMethodDeposit {
  method: "deposit"
  arguments: [ payee: TAddress ]
}

interface IMethodDepositsOf {
  method: "depositsOf"
  arguments: [ payee: TAddress ]
}

interface IMethodOwner {
  method: "owner"
  arguments: [  ]
}

interface IMethodRenounceOwnership {
  method: "renounceOwnership"
  arguments: [  ]
}

interface IMethodTransferOwnership {
  method: "transferOwnership"
  arguments: [ newOwner: TAddress ]
}

interface IMethodWithdraw {
  method: "withdraw"
  arguments: [ payee: TAddress ]
}

interface IMethodWithdrawalAllowed {
  method: "withdrawalAllowed"
  arguments: [ payee: TAddress ]
}

interface IMethods {
  deposit: IMethodDeposit
  depositsOf: IMethodDepositsOf
  owner: IMethodOwner
  renounceOwnership: IMethodRenounceOwnership
  transferOwnership: IMethodTransferOwnership
  withdraw: IMethodWithdraw
  withdrawalAllowed: IMethodWithdrawalAllowed
  '*': { method: string, arguments: any[] } 
}





