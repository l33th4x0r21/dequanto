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



export class ERC20Votes extends ContractBase {
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

    // 0xdd62ed3e
    async allowance (owner: TAddress, spender: TAddress): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'allowance'), owner, spender);
    }

    // 0x095ea7b3
    async approve (sender: TSender, spender: TAddress, amount: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'approve'), sender, spender, amount);
    }

    // 0x70a08231
    async balanceOf (account: TAddress): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'balanceOf'), account);
    }

    // 0xf1127ed8
    async checkpoints (account: TAddress, pos: number): Promise<{ fromBlock: number, votes: bigint }> {
        return this.$read(this.$getAbiItem('function', 'checkpoints'), account, pos);
    }

    // 0x313ce567
    async decimals (): Promise<number> {
        return this.$read(this.$getAbiItem('function', 'decimals'));
    }

    // 0xa457c2d7
    async decreaseAllowance (sender: TSender, spender: TAddress, subtractedValue: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'decreaseAllowance'), sender, spender, subtractedValue);
    }

    // 0x5c19a95c
    async delegate (sender: TSender, delegatee: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'delegate'), sender, delegatee);
    }

    // 0xc3cda520
    async delegateBySig (sender: TSender, delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'delegateBySig'), sender, delegatee, nonce, expiry, v, r, s);
    }

    // 0x587cde1e
    async delegates (account: TAddress): Promise<TAddress> {
        return this.$read(this.$getAbiItem('function', 'delegates'), account);
    }

    // 0x8e539e8c
    async getPastTotalSupply (blockNumber: bigint): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getPastTotalSupply'), blockNumber);
    }

    // 0x3a46b1a8
    async getPastVotes (account: TAddress, blockNumber: bigint): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getPastVotes'), account, blockNumber);
    }

    // 0x9ab24eb0
    async getVotes (account: TAddress): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'getVotes'), account);
    }

    // 0x39509351
    async increaseAllowance (sender: TSender, spender: TAddress, addedValue: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'increaseAllowance'), sender, spender, addedValue);
    }

    // 0x06fdde03
    async name (): Promise<string> {
        return this.$read(this.$getAbiItem('function', 'name'));
    }

    // 0x7ecebe00
    async nonces (owner: TAddress): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'nonces'), owner);
    }

    // 0x6fcfff45
    async numCheckpoints (account: TAddress): Promise<number> {
        return this.$read(this.$getAbiItem('function', 'numCheckpoints'), account);
    }

    // 0xd505accf
    async permit (sender: TSender, owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'permit'), sender, owner, spender, value, deadline, v, r, s);
    }

    // 0x95d89b41
    async symbol (): Promise<string> {
        return this.$read(this.$getAbiItem('function', 'symbol'));
    }

    // 0x18160ddd
    async totalSupply (): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'totalSupply'));
    }

    // 0xa9059cbb
    async transfer (sender: TSender, to: TAddress, amount: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'transfer'), sender, to, amount);
    }

    // 0x23b872dd
    async transferFrom (sender: TSender, from: TAddress, to: TAddress, amount: bigint): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'transferFrom'), sender, from, to, amount);
    }

    $call () {
        return super.$call() as IERC20VotesTxCaller;;
    }

    $data (): IERC20VotesTxData {
        return super.$data() as IERC20VotesTxData;
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

    onApproval (fn?: (event: TClientEventsStreamData<TLogApprovalParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogApprovalParameters>> {
        return this.$onLog('Approval', fn);
    }

    onDelegateChanged (fn?: (event: TClientEventsStreamData<TLogDelegateChangedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogDelegateChangedParameters>> {
        return this.$onLog('DelegateChanged', fn);
    }

    onDelegateVotesChanged (fn?: (event: TClientEventsStreamData<TLogDelegateVotesChangedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogDelegateVotesChangedParameters>> {
        return this.$onLog('DelegateVotesChanged', fn);
    }

    onTransfer (fn?: (event: TClientEventsStreamData<TLogTransferParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogTransferParameters>> {
        return this.$onLog('Transfer', fn);
    }

    extractLogsApproval (tx: TransactionReceipt): ITxLogItem<TLogApproval>[] {
        let abi = this.$getAbiItem('event', 'Approval');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogApproval>[];
    }

    extractLogsDelegateChanged (tx: TransactionReceipt): ITxLogItem<TLogDelegateChanged>[] {
        let abi = this.$getAbiItem('event', 'DelegateChanged');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogDelegateChanged>[];
    }

    extractLogsDelegateVotesChanged (tx: TransactionReceipt): ITxLogItem<TLogDelegateVotesChanged>[] {
        let abi = this.$getAbiItem('event', 'DelegateVotesChanged');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogDelegateVotesChanged>[];
    }

    extractLogsTransfer (tx: TransactionReceipt): ITxLogItem<TLogTransfer>[] {
        let abi = this.$getAbiItem('event', 'Transfer');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogTransfer>[];
    }

    async getPastLogsApproval (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { owner?: TAddress,spender?: TAddress }
    }): Promise<ITxLogItem<TLogApproval>[]> {
        return await this.$getPastLogsParsed('Approval', options) as any;
    }

    async getPastLogsDelegateChanged (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { delegator?: TAddress,fromDelegate?: TAddress,toDelegate?: TAddress }
    }): Promise<ITxLogItem<TLogDelegateChanged>[]> {
        return await this.$getPastLogsParsed('DelegateChanged', options) as any;
    }

    async getPastLogsDelegateVotesChanged (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { delegate?: TAddress }
    }): Promise<ITxLogItem<TLogDelegateVotesChanged>[]> {
        return await this.$getPastLogsParsed('DelegateVotesChanged', options) as any;
    }

    async getPastLogsTransfer (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { from?: TAddress,to?: TAddress }
    }): Promise<ITxLogItem<TLogTransfer>[]> {
        return await this.$getPastLogsParsed('Transfer', options) as any;
    }

    abi: AbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint32","name":"pos","type":"uint32"}],"name":"checkpoints","outputs":[{"components":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint224","name":"votes","type":"uint224"}],"internalType":"struct ERC20Votes.Checkpoint","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogApproval = {
        owner: TAddress, spender: TAddress, value: bigint
    };
    type TLogApprovalParameters = [ owner: TAddress, spender: TAddress, value: bigint ];
    type TLogDelegateChanged = {
        delegator: TAddress, fromDelegate: TAddress, toDelegate: TAddress
    };
    type TLogDelegateChangedParameters = [ delegator: TAddress, fromDelegate: TAddress, toDelegate: TAddress ];
    type TLogDelegateVotesChanged = {
        delegate: TAddress, previousBalance: bigint, newBalance: bigint
    };
    type TLogDelegateVotesChangedParameters = [ delegate: TAddress, previousBalance: bigint, newBalance: bigint ];
    type TLogTransfer = {
        from: TAddress, to: TAddress, value: bigint
    };
    type TLogTransferParameters = [ from: TAddress, to: TAddress, value: bigint ];

interface IEvents {
  Approval: TLogApprovalParameters
  DelegateChanged: TLogDelegateChangedParameters
  DelegateVotesChanged: TLogDelegateVotesChangedParameters
  Transfer: TLogTransferParameters
  '*': any[] 
}



interface IMethodDOMAIN_SEPARATOR {
  method: "DOMAIN_SEPARATOR"
  arguments: [  ]
}

interface IMethodAllowance {
  method: "allowance"
  arguments: [ owner: TAddress, spender: TAddress ]
}

interface IMethodApprove {
  method: "approve"
  arguments: [ spender: TAddress, amount: bigint ]
}

interface IMethodBalanceOf {
  method: "balanceOf"
  arguments: [ account: TAddress ]
}

interface IMethodCheckpoints {
  method: "checkpoints"
  arguments: [ account: TAddress, pos: number ]
}

interface IMethodDecimals {
  method: "decimals"
  arguments: [  ]
}

interface IMethodDecreaseAllowance {
  method: "decreaseAllowance"
  arguments: [ spender: TAddress, subtractedValue: bigint ]
}

interface IMethodDelegate {
  method: "delegate"
  arguments: [ delegatee: TAddress ]
}

interface IMethodDelegateBySig {
  method: "delegateBySig"
  arguments: [ delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TBufferLike, s: TBufferLike ]
}

interface IMethodDelegates {
  method: "delegates"
  arguments: [ account: TAddress ]
}

interface IMethodGetPastTotalSupply {
  method: "getPastTotalSupply"
  arguments: [ blockNumber: bigint ]
}

interface IMethodGetPastVotes {
  method: "getPastVotes"
  arguments: [ account: TAddress, blockNumber: bigint ]
}

interface IMethodGetVotes {
  method: "getVotes"
  arguments: [ account: TAddress ]
}

interface IMethodIncreaseAllowance {
  method: "increaseAllowance"
  arguments: [ spender: TAddress, addedValue: bigint ]
}

interface IMethodName {
  method: "name"
  arguments: [  ]
}

interface IMethodNonces {
  method: "nonces"
  arguments: [ owner: TAddress ]
}

interface IMethodNumCheckpoints {
  method: "numCheckpoints"
  arguments: [ account: TAddress ]
}

interface IMethodPermit {
  method: "permit"
  arguments: [ owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike ]
}

interface IMethodSymbol {
  method: "symbol"
  arguments: [  ]
}

interface IMethodTotalSupply {
  method: "totalSupply"
  arguments: [  ]
}

interface IMethodTransfer {
  method: "transfer"
  arguments: [ to: TAddress, amount: bigint ]
}

interface IMethodTransferFrom {
  method: "transferFrom"
  arguments: [ from: TAddress, to: TAddress, amount: bigint ]
}

interface IMethods {
  DOMAIN_SEPARATOR: IMethodDOMAIN_SEPARATOR
  allowance: IMethodAllowance
  approve: IMethodApprove
  balanceOf: IMethodBalanceOf
  checkpoints: IMethodCheckpoints
  decimals: IMethodDecimals
  decreaseAllowance: IMethodDecreaseAllowance
  delegate: IMethodDelegate
  delegateBySig: IMethodDelegateBySig
  delegates: IMethodDelegates
  getPastTotalSupply: IMethodGetPastTotalSupply
  getPastVotes: IMethodGetPastVotes
  getVotes: IMethodGetVotes
  increaseAllowance: IMethodIncreaseAllowance
  name: IMethodName
  nonces: IMethodNonces
  numCheckpoints: IMethodNumCheckpoints
  permit: IMethodPermit
  symbol: IMethodSymbol
  totalSupply: IMethodTotalSupply
  transfer: IMethodTransfer
  transferFrom: IMethodTransferFrom
  '*': { method: string, arguments: any[] } 
}






interface IERC20VotesTxCaller {
    approve (sender: TSender, spender: TAddress, amount: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    decreaseAllowance (sender: TSender, spender: TAddress, subtractedValue: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    delegate (sender: TSender, delegatee: TAddress): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    delegateBySig (sender: TSender, delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    increaseAllowance (sender: TSender, spender: TAddress, addedValue: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    permit (sender: TSender, owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    transfer (sender: TSender, to: TAddress, amount: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    transferFrom (sender: TSender, from: TAddress, to: TAddress, amount: bigint): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
}


interface IERC20VotesTxData {
    approve (sender: TSender, spender: TAddress, amount: bigint): Promise<TransactionConfig>
    decreaseAllowance (sender: TSender, spender: TAddress, subtractedValue: bigint): Promise<TransactionConfig>
    delegate (sender: TSender, delegatee: TAddress): Promise<TransactionConfig>
    delegateBySig (sender: TSender, delegatee: TAddress, nonce: bigint, expiry: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<TransactionConfig>
    increaseAllowance (sender: TSender, spender: TAddress, addedValue: bigint): Promise<TransactionConfig>
    permit (sender: TSender, owner: TAddress, spender: TAddress, value: bigint, deadline: bigint, v: number, r: TBufferLike, s: TBufferLike): Promise<TransactionConfig>
    transfer (sender: TSender, to: TAddress, amount: bigint): Promise<TransactionConfig>
    transferFrom (sender: TSender, from: TAddress, to: TAddress, amount: bigint): Promise<TransactionConfig>
}


