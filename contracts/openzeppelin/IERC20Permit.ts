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



export class IERC20Permit extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0x3644e515
    async DOMAIN_SEPARATOR (): Promise<TBufferLike> {
        return this.$read(this.$getAbiItem('function', 'DOMAIN_SEPARATOR'));
    }

    // 0x7ecebe00
    async nonces (owner: TAddress): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'nonces'), owner);
    }

    // 0xd505accf
    async permit (sender: TSender, owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'permit'), sender, owner, spender, value, deadline, v, r, s);
    }

    $call () {
        return super.$call() as IIERC20PermitTxCaller;;
    }

    $data (): IIERC20PermitTxData {
        return super.$data() as IIERC20PermitTxData;
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







    abi: AbiItem[] = [{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}



interface IEvents {
  '*': any[] 
}



interface IMethodDOMAIN_SEPARATOR {
  method: "DOMAIN_SEPARATOR"
  arguments: [  ]
}

interface IMethodNonces {
  method: "nonces"
  arguments: [ owner: TAddress ]
}

interface IMethodPermit {
  method: "permit"
  arguments: [ owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike ]
}

interface IMethods {
  DOMAIN_SEPARATOR: IMethodDOMAIN_SEPARATOR
  nonces: IMethodNonces
  permit: IMethodPermit
  '*': { method: string, arguments: any[] } 
}






interface IIERC20PermitTxCaller {
    permit (sender: TSender, owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
}


interface IIERC20PermitTxData {
    permit (sender: TSender, owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<TransactionConfig>
}


