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
export class AccessControlCrossChain extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0xf9d04295
    async CROSSCHAIN_ALIAS (): Promise<TBufferLike> {
        return this.$read('function CROSSCHAIN_ALIAS() returns bytes32');
    }

    // 0xa217fddf
    async DEFAULT_ADMIN_ROLE (): Promise<TBufferLike> {
        return this.$read('function DEFAULT_ADMIN_ROLE() returns bytes32');
    }

    // 0x248a9ca3
    async getRoleAdmin (role: TBufferLike): Promise<TBufferLike> {
        return this.$read('function getRoleAdmin(bytes32) returns bytes32', role);
    }

    // 0x2f2ff15d
    async grantRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'grantRole'), sender, role, account);
    }

    // 0x91d14854
    async hasRole (role: TBufferLike, account: TAddress): Promise<boolean> {
        return this.$read('function hasRole(bytes32, address) returns bool', role, account);
    }

    // 0x36568abe
    async renounceRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'renounceRole'), sender, role, account);
    }

    // 0xd547741f
    async revokeRole (sender: TSender, role: TBufferLike, account: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'revokeRole'), sender, role, account);
    }

    // 0x01ffc9a7
    async supportsInterface (interfaceId: TBufferLike): Promise<boolean> {
        return this.$read('function supportsInterface(bytes4) returns bool', interfaceId);
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

    onRoleAdminChanged (fn?: (event: TClientEventsStreamData<TLogRoleAdminChangedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogRoleAdminChangedParameters>> {
        return this.$onLog('RoleAdminChanged', fn);
    }

    onRoleGranted (fn?: (event: TClientEventsStreamData<TLogRoleGrantedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogRoleGrantedParameters>> {
        return this.$onLog('RoleGranted', fn);
    }

    onRoleRevoked (fn?: (event: TClientEventsStreamData<TLogRoleRevokedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogRoleRevokedParameters>> {
        return this.$onLog('RoleRevoked', fn);
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

    async getPastLogsRoleAdminChanged (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { role?: TBufferLike,previousAdminRole?: TBufferLike,newAdminRole?: TBufferLike }
    }): Promise<ITxLogItem<TLogRoleAdminChanged>[]> {
        let topic = '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff';
        let abi = this.$getAbiItem('event', 'RoleAdminChanged');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsRoleGranted (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { role?: TBufferLike,account?: TAddress,sender?: TAddress }
    }): Promise<ITxLogItem<TLogRoleGranted>[]> {
        let topic = '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d';
        let abi = this.$getAbiItem('event', 'RoleGranted');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsRoleRevoked (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { role?: TBufferLike,account?: TAddress,sender?: TAddress }
    }): Promise<ITxLogItem<TLogRoleRevoked>[]> {
        let topic = '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b';
        let abi = this.$getAbiItem('event', 'RoleRevoked');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    abi: AbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"inputs":[],"name":"CROSSCHAIN_ALIAS","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

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
  RoleAdminChanged: TLogRoleAdminChangedParameters
  RoleGranted: TLogRoleGrantedParameters
  RoleRevoked: TLogRoleRevokedParameters
  '*': any[] 
}



interface IMethodCROSSCHAIN_ALIAS {
  method: "CROSSCHAIN_ALIAS"
  arguments: [  ]
}

interface IMethodDEFAULT_ADMIN_ROLE {
  method: "DEFAULT_ADMIN_ROLE"
  arguments: [  ]
}

interface IMethodGetRoleAdmin {
  method: "getRoleAdmin"
  arguments: [ role: TBufferLike ]
}

interface IMethodGrantRole {
  method: "grantRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodHasRole {
  method: "hasRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodRenounceRole {
  method: "renounceRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodRevokeRole {
  method: "revokeRole"
  arguments: [ role: TBufferLike, account: TAddress ]
}

interface IMethodSupportsInterface {
  method: "supportsInterface"
  arguments: [ interfaceId: TBufferLike ]
}

interface IMethods {
  CROSSCHAIN_ALIAS: IMethodCROSSCHAIN_ALIAS
  DEFAULT_ADMIN_ROLE: IMethodDEFAULT_ADMIN_ROLE
  getRoleAdmin: IMethodGetRoleAdmin
  grantRole: IMethodGrantRole
  hasRole: IMethodHasRole
  renounceRole: IMethodRenounceRole
  revokeRole: IMethodRevokeRole
  supportsInterface: IMethodSupportsInterface
  '*': { method: string, arguments: any[] } 
}





