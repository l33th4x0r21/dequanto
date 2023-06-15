/**
 *  AUTO-Generated Class: 2023-06-15 23:19
 *  Implementation: https://etherscan.io/address/undefined#code
 */
import di from 'a-di';
import { TAddress } from '@dequanto/models/TAddress';
import { TAccount } from '@dequanto/models/TAccount';
import { TBufferLike } from '@dequanto/models/TBufferLike';
import { ClientEventsStream, TClientEventsStreamData } from '@dequanto/clients/ClientEventsStream';
import { ContractBase, ContractBaseHelper } from '@dequanto/contracts/ContractBase';
import { ContractStorageReaderBase } from '@dequanto/contracts/ContractStorageReaderBase';
import { TxWriter } from '@dequanto/txs/TxWriter';
import { ITxLogItem } from '@dequanto/txs/receipt/ITxLogItem';
import { Web3Client } from '@dequanto/clients/Web3Client';
import { IBlockChainExplorer } from '@dequanto/BlockchainExplorer/IBlockChainExplorer';
import { SubjectStream } from '@dequanto/class/SubjectStream';

import type { TransactionReceipt, Transaction, EventLog, TransactionConfig } from 'web3-core';
import type { ContractWriter } from '@dequanto/contracts/ContractWriter';
import type { AbiItem } from 'web3-utils';
import type { BlockTransactionString } from 'web3-eth';


import { Etherscan } from '@dequanto/BlockchainExplorer/Etherscan'
import { EthWeb3Client } from '@dequanto/clients/EthWeb3Client'



export class TimelockController extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0xb08e51c0
    async CANCELLER_ROLE (): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'CANCELLER_ROLE'));
    }

    // 0xa217fddf
    async DEFAULT_ADMIN_ROLE (): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'DEFAULT_ADMIN_ROLE'));
    }

    // 0x07bd0265
    async EXECUTOR_ROLE (): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'EXECUTOR_ROLE'));
    }

    // 0x8f61f4f5
    async PROPOSER_ROLE (): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'PROPOSER_ROLE'));
    }

    // 0x0d3cf6fc
    async TIMELOCK_ADMIN_ROLE (): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'TIMELOCK_ADMIN_ROLE'));
    }

    // 0xc4d252f5
    async cancel (sender: TSender, id: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'cancel'), sender, id);
    }

    // 0x134008d3
    async execute (sender: TSender, target: TAddress, value: bigint, payload: TBufferLike, predecessor: TBufferLike, salt: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'execute'), sender, target, value, payload, predecessor, salt);
    }

    // 0xe38335e5
    async executeBatch (sender: TSender, targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'executeBatch'), sender, targets, values, payloads, predecessor, salt);
    }

    // 0xf27a0c92
    async getMinDelay (): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getMinDelay'));
    }

    // 0x248a9ca3
    async getRoleAdmin (role: TBufferLike): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'getRoleAdmin'), role);
    }

    // 0xd45c4435
    async getTimestamp (id: TBufferLike): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getTimestamp'), id);
    }

    // 0x2f2ff15d
    async grantRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'grantRole'), sender, role, account);
    }

    // 0x91d14854
    async hasRole (role: TBufferLike, account: TAddress): Promise<boolean> {
        return this.$read(this.$getAbiItem('function', 'hasRole'), role, account);
    }

    // 0x8065657f
    async hashOperation (target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, salt: TBufferLike): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'hashOperation'), target, value, data, predecessor, salt);
    }

    // 0xb1c5f427
    async hashOperationBatch (targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'hashOperationBatch'), targets, values, payloads, predecessor, salt);
    }

    // 0x31d50750
    async isOperation (id: TBufferLike): Promise<boolean> {
        return this.$read(this.$getAbiItem('function', 'isOperation'), id);
    }

    // 0x2ab0f529
    async isOperationDone (id: TBufferLike): Promise<boolean> {
        return this.$read(this.$getAbiItem('function', 'isOperationDone'), id);
    }

    // 0x584b153e
    async isOperationPending (id: TBufferLike): Promise<boolean> {
        return this.$read(this.$getAbiItem('function', 'isOperationPending'), id);
    }

    // 0x13bc9f20
    async isOperationReady (id: TBufferLike): Promise<boolean> {
        return this.$read(this.$getAbiItem('function', 'isOperationReady'), id);
    }

    // 0xbc197c81
    async onERC1155BatchReceived (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint[], input3: bigint[], input4: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'onERC1155BatchReceived'), sender, input0, input1, input2, input3, input4);
    }

    // 0xf23a6e61
    async onERC1155Received (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint, input3: bigint, input4: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'onERC1155Received'), sender, input0, input1, input2, input3, input4);
    }

    // 0x150b7a02
    async onERC721Received (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint, input3: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'onERC721Received'), sender, input0, input1, input2, input3);
    }

    // 0x36568abe
    async renounceRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'renounceRole'), sender, role, account);
    }

    // 0xd547741f
    async revokeRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'revokeRole'), sender, role, account);
    }

    // 0x01d5062a
    async schedule (sender: TSender, target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, salt: TBufferLike, delay: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'schedule'), sender, target, value, data, predecessor, salt, delay);
    }

    // 0x8f2a0bb0
    async scheduleBatch (sender: TSender, targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike, delay: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'scheduleBatch'), sender, targets, values, payloads, predecessor, salt, delay);
    }

    // 0x01ffc9a7
    async supportsInterface (interfaceId: TBufferLike): Promise<boolean> {
        return this.$read(this.$getAbiItem('function', 'supportsInterface'), interfaceId);
    }

    // 0x64d62353
    async updateDelay (sender: TSender, newDelay: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'updateDelay'), sender, newDelay);
    }

    $call () {
        return super.$call() as ITimelockControllerTxCaller;;
    }

    $data (): ITimelockControllerTxData {
        return super.$data() as ITimelockControllerTxData;
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

    onCallExecuted (fn?: (event: TClientEventsStreamData<TLogCallExecutedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogCallExecutedParameters>> {
        return this.$onLog('CallExecuted', fn);
    }

    onCallScheduled (fn?: (event: TClientEventsStreamData<TLogCallScheduledParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogCallScheduledParameters>> {
        return this.$onLog('CallScheduled', fn);
    }

    onCancelled (fn?: (event: TClientEventsStreamData<TLogCancelledParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogCancelledParameters>> {
        return this.$onLog('Cancelled', fn);
    }

    onMinDelayChange (fn?: (event: TClientEventsStreamData<TLogMinDelayChangeParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogMinDelayChangeParameters>> {
        return this.$onLog('MinDelayChange', fn);
    }

    onRoleAdminChanged (fn?: (event: TClientEventsStreamData<TLogRoleAdminChangedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogRoleAdminChangedParameters>> {
        return this.$onLog('RoleAdminChanged', fn);
    }

    onRoleGranted (fn?: (event: TClientEventsStreamData<TLogRoleGrantedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogRoleGrantedParameters>> {
        return this.$onLog('RoleGranted', fn);
    }

    onRoleRevoked (fn?: (event: TClientEventsStreamData<TLogRoleRevokedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogRoleRevokedParameters>> {
        return this.$onLog('RoleRevoked', fn);
    }

    extractLogsCallExecuted (tx: TransactionReceipt): ITxLogItem<TLogCallExecuted>[] {
        let abi = this.$getAbiItem('event', 'CallExecuted');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogCallExecuted>[];
    }

    extractLogsCallScheduled (tx: TransactionReceipt): ITxLogItem<TLogCallScheduled>[] {
        let abi = this.$getAbiItem('event', 'CallScheduled');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogCallScheduled>[];
    }

    extractLogsCancelled (tx: TransactionReceipt): ITxLogItem<TLogCancelled>[] {
        let abi = this.$getAbiItem('event', 'Cancelled');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogCancelled>[];
    }

    extractLogsMinDelayChange (tx: TransactionReceipt): ITxLogItem<TLogMinDelayChange>[] {
        let abi = this.$getAbiItem('event', 'MinDelayChange');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogMinDelayChange>[];
    }

    extractLogsRoleAdminChanged (tx: TransactionReceipt): ITxLogItem<TLogRoleAdminChanged>[] {
        let abi = this.$getAbiItem('event', 'RoleAdminChanged');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogRoleAdminChanged>[];
    }

    extractLogsRoleGranted (tx: TransactionReceipt): ITxLogItem<TLogRoleGranted>[] {
        let abi = this.$getAbiItem('event', 'RoleGranted');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogRoleGranted>[];
    }

    extractLogsRoleRevoked (tx: TransactionReceipt): ITxLogItem<TLogRoleRevoked>[] {
        let abi = this.$getAbiItem('event', 'RoleRevoked');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogRoleRevoked>[];
    }

    async getPastLogsCallExecuted (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { id?: TBufferLike,index?: bigint }
    }): Promise<ITxLogItem<TLogCallExecuted>[]> {
        return await this.$getPastLogsParsed('CallExecuted', options) as any;
    }

    async getPastLogsCallScheduled (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { id?: TBufferLike,index?: bigint }
    }): Promise<ITxLogItem<TLogCallScheduled>[]> {
        return await this.$getPastLogsParsed('CallScheduled', options) as any;
    }

    async getPastLogsCancelled (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { id?: TBufferLike }
    }): Promise<ITxLogItem<TLogCancelled>[]> {
        return await this.$getPastLogsParsed('Cancelled', options) as any;
    }

    async getPastLogsMinDelayChange (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: {  }
    }): Promise<ITxLogItem<TLogMinDelayChange>[]> {
        return await this.$getPastLogsParsed('MinDelayChange', options) as any;
    }

    async getPastLogsRoleAdminChanged (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { role?: TBufferLike,previousAdminRole?: TBufferLike,newAdminRole?: TBufferLike }
    }): Promise<ITxLogItem<TLogRoleAdminChanged>[]> {
        return await this.$getPastLogsParsed('RoleAdminChanged', options) as any;
    }

    async getPastLogsRoleGranted (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { role?: TBufferLike,account?: TAddress,sender?: TAddress }
    }): Promise<ITxLogItem<TLogRoleGranted>[]> {
        return await this.$getPastLogsParsed('RoleGranted', options) as any;
    }

    async getPastLogsRoleRevoked (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { role?: TBufferLike,account?: TAddress,sender?: TAddress }
    }): Promise<ITxLogItem<TLogRoleRevoked>[]> {
        return await this.$getPastLogsParsed('RoleRevoked', options) as any;
    }

    abi: AbiItem[] = [{"inputs":[{"internalType":"uint256","name":"minDelay","type":"uint256"},{"internalType":"address[]","name":"proposers","type":"address[]"},{"internalType":"address[]","name":"executors","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"},{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"CallExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"},{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"},{"indexed":false,"internalType":"bytes32","name":"predecessor","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"delay","type":"uint256"}],"name":"CallScheduled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"Cancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"MinDelayChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"inputs":[],"name":"CANCELLER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EXECUTOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PROPOSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIMELOCK_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"cancel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"bytes32","name":"predecessor","type":"bytes32"},{"internalType":"bytes32","name":"salt","type":"bytes32"}],"name":"execute","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes[]","name":"payloads","type":"bytes[]"},{"internalType":"bytes32","name":"predecessor","type":"bytes32"},{"internalType":"bytes32","name":"salt","type":"bytes32"}],"name":"executeBatch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getMinDelay","outputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"getTimestamp","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes32","name":"predecessor","type":"bytes32"},{"internalType":"bytes32","name":"salt","type":"bytes32"}],"name":"hashOperation","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes[]","name":"payloads","type":"bytes[]"},{"internalType":"bytes32","name":"predecessor","type":"bytes32"},{"internalType":"bytes32","name":"salt","type":"bytes32"}],"name":"hashOperationBatch","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"isOperation","outputs":[{"internalType":"bool","name":"registered","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"isOperationDone","outputs":[{"internalType":"bool","name":"done","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"isOperationPending","outputs":[{"internalType":"bool","name":"pending","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"isOperationReady","outputs":[{"internalType":"bool","name":"ready","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes32","name":"predecessor","type":"bytes32"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"uint256","name":"delay","type":"uint256"}],"name":"schedule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes[]","name":"payloads","type":"bytes[]"},{"internalType":"bytes32","name":"predecessor","type":"bytes32"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"uint256","name":"delay","type":"uint256"}],"name":"scheduleBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newDelay","type":"uint256"}],"name":"updateDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogCallExecuted = {
        id: TBufferLike, index: bigint, target: TAddress, value: bigint, data: TBufferLike
    };
    type TLogCallExecutedParameters = [ id: TBufferLike, index: bigint, target: TAddress, value: bigint, data: TBufferLike ];
    type TLogCallScheduled = {
        id: TBufferLike, index: bigint, target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, delay: bigint
    };
    type TLogCallScheduledParameters = [ id: TBufferLike, index: bigint, target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, delay: bigint ];
    type TLogCancelled = {
        id: TBufferLike
    };
    type TLogCancelledParameters = [ id: TBufferLike ];
    type TLogMinDelayChange = {
        oldDuration: bigint, newDuration: bigint
    };
    type TLogMinDelayChangeParameters = [ oldDuration: bigint, newDuration: bigint ];
    type TLogRoleAdminChanged = {
        role: TBufferLike, previousAdminRole: TBufferLike, newAdminRole: TBufferLike
    };
    type TLogRoleAdminChangedParameters = [ role: TBufferLike, previousAdminRole: TBufferLike, newAdminRole: TBufferLike ];
    type TLogRoleGranted = {
        role: TBufferLike, account: TAddress, _sender: TAddress
    };
    type TLogRoleGrantedParameters = [ role: TBufferLike, account: TAddress, _sender: TAddress ];
    type TLogRoleRevoked = {
        role: TBufferLike, account: TAddress, _sender: TAddress
    };
    type TLogRoleRevokedParameters = [ role: TBufferLike, account: TAddress, _sender: TAddress ];

interface IEvents {
  CallExecuted: TLogCallExecutedParameters
  CallScheduled: TLogCallScheduledParameters
  Cancelled: TLogCancelledParameters
  MinDelayChange: TLogMinDelayChangeParameters
  RoleAdminChanged: TLogRoleAdminChangedParameters
  RoleGranted: TLogRoleGrantedParameters
  RoleRevoked: TLogRoleRevokedParameters
  '*': any[] 
}



interface IMethodCANCELLER_ROLE {
  method: "CANCELLER_ROLE"
  arguments: [  ]
}

interface IMethodDEFAULT_ADMIN_ROLE {
  method: "DEFAULT_ADMIN_ROLE"
  arguments: [  ]
}

interface IMethodEXECUTOR_ROLE {
  method: "EXECUTOR_ROLE"
  arguments: [  ]
}

interface IMethodPROPOSER_ROLE {
  method: "PROPOSER_ROLE"
  arguments: [  ]
}

interface IMethodTIMELOCK_ADMIN_ROLE {
  method: "TIMELOCK_ADMIN_ROLE"
  arguments: [  ]
}

interface IMethodCancel {
  method: "cancel"
  arguments: [ id: TBufferLike ]
}

interface IMethodExecute {
  method: "execute"
  arguments: [ target: TAddress, value: bigint, payload: TBufferLike, predecessor: TBufferLike, salt: TBufferLike ]
}

interface IMethodExecuteBatch {
  method: "executeBatch"
  arguments: [ targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike ]
}

interface IMethodGetMinDelay {
  method: "getMinDelay"
  arguments: [  ]
}

interface IMethodGetRoleAdmin {
  method: "getRoleAdmin"
  arguments: [ role: TBufferLike ]
}

interface IMethodGetTimestamp {
  method: "getTimestamp"
  arguments: [ id: TBufferLike ]
}

interface IMethodGrantRole {
  method: "grantRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodHasRole {
  method: "hasRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodHashOperation {
  method: "hashOperation"
  arguments: [ target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, salt: TBufferLike ]
}

interface IMethodHashOperationBatch {
  method: "hashOperationBatch"
  arguments: [ targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike ]
}

interface IMethodIsOperation {
  method: "isOperation"
  arguments: [ id: TBufferLike ]
}

interface IMethodIsOperationDone {
  method: "isOperationDone"
  arguments: [ id: TBufferLike ]
}

interface IMethodIsOperationPending {
  method: "isOperationPending"
  arguments: [ id: TBufferLike ]
}

interface IMethodIsOperationReady {
  method: "isOperationReady"
  arguments: [ id: TBufferLike ]
}

interface IMethodOnERC1155BatchReceived {
  method: "onERC1155BatchReceived"
  arguments: [ input0: TAddress, input1: TAddress, input2: bigint[], input3: bigint[], input4: TBufferLike ]
}

interface IMethodOnERC1155Received {
  method: "onERC1155Received"
  arguments: [ input0: TAddress, input1: TAddress, input2: bigint, input3: bigint, input4: TBufferLike ]
}

interface IMethodOnERC721Received {
  method: "onERC721Received"
  arguments: [ input0: TAddress, input1: TAddress, input2: bigint, input3: TBufferLike ]
}

interface IMethodRenounceRole {
  method: "renounceRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodRevokeRole {
  method: "revokeRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodSchedule {
  method: "schedule"
  arguments: [ target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, salt: TBufferLike, delay: bigint ]
}

interface IMethodScheduleBatch {
  method: "scheduleBatch"
  arguments: [ targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike, delay: bigint ]
}

interface IMethodSupportsInterface {
  method: "supportsInterface"
  arguments: [ interfaceId: TBufferLike ]
}

interface IMethodUpdateDelay {
  method: "updateDelay"
  arguments: [ newDelay: bigint ]
}

interface IMethods {
  CANCELLER_ROLE: IMethodCANCELLER_ROLE
  DEFAULT_ADMIN_ROLE: IMethodDEFAULT_ADMIN_ROLE
  EXECUTOR_ROLE: IMethodEXECUTOR_ROLE
  PROPOSER_ROLE: IMethodPROPOSER_ROLE
  TIMELOCK_ADMIN_ROLE: IMethodTIMELOCK_ADMIN_ROLE
  cancel: IMethodCancel
  execute: IMethodExecute
  executeBatch: IMethodExecuteBatch
  getMinDelay: IMethodGetMinDelay
  getRoleAdmin: IMethodGetRoleAdmin
  getTimestamp: IMethodGetTimestamp
  grantRole: IMethodGrantRole
  hasRole: IMethodHasRole
  hashOperation: IMethodHashOperation
  hashOperationBatch: IMethodHashOperationBatch
  isOperation: IMethodIsOperation
  isOperationDone: IMethodIsOperationDone
  isOperationPending: IMethodIsOperationPending
  isOperationReady: IMethodIsOperationReady
  onERC1155BatchReceived: IMethodOnERC1155BatchReceived
  onERC1155Received: IMethodOnERC1155Received
  onERC721Received: IMethodOnERC721Received
  renounceRole: IMethodRenounceRole
  revokeRole: IMethodRevokeRole
  schedule: IMethodSchedule
  scheduleBatch: IMethodScheduleBatch
  supportsInterface: IMethodSupportsInterface
  updateDelay: IMethodUpdateDelay
  '*': { method: string, arguments: any[] } 
}






interface ITimelockControllerTxCaller {
    cancel (sender: TSender, id: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    execute (sender: TSender, target: TAddress, value: bigint, payload: TBufferLike, predecessor: TBufferLike, salt: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    executeBatch (sender: TSender, targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    grantRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    onERC1155BatchReceived (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint[], input3: bigint[], input4: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    onERC1155Received (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint, input3: bigint, input4: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    onERC721Received (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint, input3: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    renounceRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    revokeRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    schedule (sender: TSender, target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, salt: TBufferLike, delay: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    scheduleBatch (sender: TSender, targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike, delay: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    updateDelay (sender: TSender, newDelay: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
}


interface ITimelockControllerTxData {
    cancel (sender: TSender, id: TBufferLike): Promise<TransactionConfig>
    execute (sender: TSender, target: TAddress, value: bigint, payload: TBufferLike, predecessor: TBufferLike, salt: TBufferLike): Promise<TransactionConfig>
    executeBatch (sender: TSender, targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike): Promise<TransactionConfig>
    grantRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TransactionConfig>
    onERC1155BatchReceived (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint[], input3: bigint[], input4: TBufferLike): Promise<TransactionConfig>
    onERC1155Received (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint, input3: bigint, input4: TBufferLike): Promise<TransactionConfig>
    onERC721Received (sender: TSender, input0: TAddress, input1: TAddress, input2: bigint, input3: TBufferLike): Promise<TransactionConfig>
    renounceRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TransactionConfig>
    revokeRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TransactionConfig>
    schedule (sender: TSender, target: TAddress, value: bigint, data: TBufferLike, predecessor: TBufferLike, salt: TBufferLike, delay: bigint): Promise<TransactionConfig>
    scheduleBatch (sender: TSender, targets: TAddress[], values: bigint[], payloads: TBufferLike[], predecessor: TBufferLike, salt: TBufferLike, delay: bigint): Promise<TransactionConfig>
    updateDelay (sender: TSender, newDelay: bigint): Promise<TransactionConfig>
}


