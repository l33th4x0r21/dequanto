/**
 *  AUTO-Generated Class: 2023-12-22 01:26
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



export class IInbox extends ContractBase {
    constructor(
        public address: TEth.Address = null,
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)

        
    }

    

    // 0xe78cea92
    async bridge (): Promise<TAddress> {
        return this.$read(this.$getAbiItem('function', 'bridge'));
    }

    // 0xa66b327d
    async calculateRetryableSubmissionFee (dataLength: bigint, baseFee: bigint): Promise<bigint> {
        return this.$read(this.$getAbiItem('function', 'calculateRetryableSubmissionFee'), dataLength, baseFee);
    }

    // 0x679b6ded
    async createRetryableTicket (sender: TSender, to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'createRetryableTicket'), sender, to, l2CallValue, maxSubmissionCost, excessFeeRefundAddress, callValueRefundAddress, gasLimit, maxFeePerGas, data);
    }

    // 0x439370b1
    async depositEth (sender: TSender, ): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'depositEth'), sender);
    }

    // 0x485cc955
    async initialize (sender: TSender, _bridge: TAddress, _sequencerInbox: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'initialize'), sender, _bridge, _sequencerInbox);
    }

    // 0x8456cb59
    async pause (sender: TSender, ): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'pause'), sender);
    }

    // 0xc474d2c5
    async postUpgradeInit (sender: TSender, _bridge: TAddress): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'postUpgradeInit'), sender, _bridge);
    }

    // 0x8a631aa6
    async sendContractTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, value: bigint, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'sendContractTransaction'), sender, gasLimit, maxFeePerGas, to, value, data);
    }

    // 0x5e916758
    async sendL1FundedContractTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'sendL1FundedContractTransaction'), sender, gasLimit, maxFeePerGas, to, data);
    }

    // 0x67ef3ab8
    async sendL1FundedUnsignedTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'sendL1FundedUnsignedTransaction'), sender, gasLimit, maxFeePerGas, nonce, to, data);
    }

    // 0xb75436bb
    async sendL2Message (sender: TSender, messageData: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'sendL2Message'), sender, messageData);
    }

    // 0x1fe927cf
    async sendL2MessageFromOrigin (sender: TSender, messageData: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'sendL2MessageFromOrigin'), sender, messageData);
    }

    // 0x5075788b
    async sendUnsignedTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, value: bigint, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'sendUnsignedTransaction'), sender, gasLimit, maxFeePerGas, nonce, to, value, data);
    }

    // 0xee35f327
    async sequencerInbox (): Promise<TAddress> {
        return this.$read(this.$getAbiItem('function', 'sequencerInbox'));
    }

    // 0x3f4ba83a
    async unpause (sender: TSender, ): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'unpause'), sender);
    }

    // 0x6e6e8a6a
    async unsafeCreateRetryableTicket (sender: TSender, to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'unsafeCreateRetryableTicket'), sender, to, l2CallValue, maxSubmissionCost, excessFeeRefundAddress, callValueRefundAddress, gasLimit, maxFeePerGas, data);
    }

    $call () {
        return super.$call() as IIInboxTxCaller;
    }
    $signed (): TOverrideReturns<IIInboxTxCaller, Promise<{ signed: TEth.Hex, error?: Error & { data?: { type: string, params } } }>> {
        return super.$signed() as any;
    }
    $data (): IIInboxTxData {
        return super.$data() as IIInboxTxData;
    }
    $gas (): TOverrideReturns<IIInboxTxCaller, Promise<{ gas?: bigint, price?: bigint, error?: Error & { data?: { type: string, params } } }>> {
        return super.$gas() as any;
    }

    onTransaction <TMethod extends keyof IMethods> (method: TMethod, options: Parameters<ContractBase['$onTransaction']>[0]): SubjectStream<{
        tx: TEth.Tx
        block: TEth.Block<TEth.Hex>
        calldata: IMethods[TMethod]
    }> {
        options ??= {};
        options.filter ??= {};
        options.filter.method = method;
        return <any> this.$onTransaction(options);
    }

    onLog (event: keyof IEvents, cb?: (event: TClientEventsStreamData) => void): ClientEventsStream<TClientEventsStreamData> {
        return this.$onLog(event, cb);
    }

    onInboxMessageDelivered (fn?: (event: TClientEventsStreamData<TLogInboxMessageDeliveredParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogInboxMessageDeliveredParameters>> {
        return this.$onLog('InboxMessageDelivered', fn);
    }

    onInboxMessageDeliveredFromOrigin (fn?: (event: TClientEventsStreamData<TLogInboxMessageDeliveredFromOriginParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogInboxMessageDeliveredFromOriginParameters>> {
        return this.$onLog('InboxMessageDeliveredFromOrigin', fn);
    }

    extractLogsInboxMessageDelivered (tx: TEth.TxReceipt): ITxLogItem<TLogInboxMessageDelivered>[] {
        let abi = this.$getAbiItem('event', 'InboxMessageDelivered');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogInboxMessageDelivered>[];
    }

    extractLogsInboxMessageDeliveredFromOrigin (tx: TEth.TxReceipt): ITxLogItem<TLogInboxMessageDeliveredFromOrigin>[] {
        let abi = this.$getAbiItem('event', 'InboxMessageDeliveredFromOrigin');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogInboxMessageDeliveredFromOrigin>[];
    }

    async getPastLogsInboxMessageDelivered (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { messageNum?: bigint }
    }): Promise<ITxLogItem<TLogInboxMessageDelivered>[]> {
        return await this.$getPastLogsParsed('InboxMessageDelivered', options) as any;
    }

    async getPastLogsInboxMessageDeliveredFromOrigin (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { messageNum?: bigint }
    }): Promise<ITxLogItem<TLogInboxMessageDeliveredFromOrigin>[]> {
        return await this.$getPastLogsParsed('InboxMessageDeliveredFromOrigin', options) as any;
    }

    abi: TAbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"messageNum","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"InboxMessageDelivered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"messageNum","type":"uint256"}],"name":"InboxMessageDeliveredFromOrigin","type":"event"},{"inputs":[],"name":"bridge","outputs":[{"internalType":"contract IBridge","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"dataLength","type":"uint256"},{"internalType":"uint256","name":"baseFee","type":"uint256"}],"name":"calculateRetryableSubmissionFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"l2CallValue","type":"uint256"},{"internalType":"uint256","name":"maxSubmissionCost","type":"uint256"},{"internalType":"address","name":"excessFeeRefundAddress","type":"address"},{"internalType":"address","name":"callValueRefundAddress","type":"address"},{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"maxFeePerGas","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"createRetryableTicket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"depositEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IBridge","name":"_bridge","type":"address"},{"internalType":"address","name":"_sequencerInbox","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBridge","name":"_bridge","type":"address"}],"name":"postUpgradeInit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"maxFeePerGas","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendContractTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"maxFeePerGas","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendL1FundedContractTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"maxFeePerGas","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendL1FundedUnsignedTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"messageData","type":"bytes"}],"name":"sendL2Message","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"messageData","type":"bytes"}],"name":"sendL2MessageFromOrigin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"maxFeePerGas","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendUnsignedTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sequencerInbox","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"l2CallValue","type":"uint256"},{"internalType":"uint256","name":"maxSubmissionCost","type":"uint256"},{"internalType":"address","name":"excessFeeRefundAddress","type":"address"},{"internalType":"address","name":"callValueRefundAddress","type":"address"},{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"maxFeePerGas","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"unsafeCreateRetryableTicket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogInboxMessageDelivered = {
        messageNum: bigint, data: TBufferLike
    };
    type TLogInboxMessageDeliveredParameters = [ messageNum: bigint, data: TBufferLike ];
    type TLogInboxMessageDeliveredFromOrigin = {
        messageNum: bigint
    };
    type TLogInboxMessageDeliveredFromOriginParameters = [ messageNum: bigint ];

interface IEvents {
  InboxMessageDelivered: TLogInboxMessageDeliveredParameters
  InboxMessageDeliveredFromOrigin: TLogInboxMessageDeliveredFromOriginParameters
  '*': any[] 
}



interface IMethodBridge {
  method: "bridge"
  arguments: [  ]
}

interface IMethodCalculateRetryableSubmissionFee {
  method: "calculateRetryableSubmissionFee"
  arguments: [ dataLength: bigint, baseFee: bigint ]
}

interface IMethodCreateRetryableTicket {
  method: "createRetryableTicket"
  arguments: [ to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike ]
}

interface IMethodDepositEth {
  method: "depositEth"
  arguments: [  ]
}

interface IMethodInitialize {
  method: "initialize"
  arguments: [ _bridge: TAddress, _sequencerInbox: TAddress ]
}

interface IMethodPause {
  method: "pause"
  arguments: [  ]
}

interface IMethodPostUpgradeInit {
  method: "postUpgradeInit"
  arguments: [ _bridge: TAddress ]
}

interface IMethodSendContractTransaction {
  method: "sendContractTransaction"
  arguments: [ gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, value: bigint, data: TBufferLike ]
}

interface IMethodSendL1FundedContractTransaction {
  method: "sendL1FundedContractTransaction"
  arguments: [ gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, data: TBufferLike ]
}

interface IMethodSendL1FundedUnsignedTransaction {
  method: "sendL1FundedUnsignedTransaction"
  arguments: [ gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, data: TBufferLike ]
}

interface IMethodSendL2Message {
  method: "sendL2Message"
  arguments: [ messageData: TBufferLike ]
}

interface IMethodSendL2MessageFromOrigin {
  method: "sendL2MessageFromOrigin"
  arguments: [ messageData: TBufferLike ]
}

interface IMethodSendUnsignedTransaction {
  method: "sendUnsignedTransaction"
  arguments: [ gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, value: bigint, data: TBufferLike ]
}

interface IMethodSequencerInbox {
  method: "sequencerInbox"
  arguments: [  ]
}

interface IMethodUnpause {
  method: "unpause"
  arguments: [  ]
}

interface IMethodUnsafeCreateRetryableTicket {
  method: "unsafeCreateRetryableTicket"
  arguments: [ to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike ]
}

interface IMethods {
  bridge: IMethodBridge
  calculateRetryableSubmissionFee: IMethodCalculateRetryableSubmissionFee
  createRetryableTicket: IMethodCreateRetryableTicket
  depositEth: IMethodDepositEth
  initialize: IMethodInitialize
  pause: IMethodPause
  postUpgradeInit: IMethodPostUpgradeInit
  sendContractTransaction: IMethodSendContractTransaction
  sendL1FundedContractTransaction: IMethodSendL1FundedContractTransaction
  sendL1FundedUnsignedTransaction: IMethodSendL1FundedUnsignedTransaction
  sendL2Message: IMethodSendL2Message
  sendL2MessageFromOrigin: IMethodSendL2MessageFromOrigin
  sendUnsignedTransaction: IMethodSendUnsignedTransaction
  sequencerInbox: IMethodSequencerInbox
  unpause: IMethodUnpause
  unsafeCreateRetryableTicket: IMethodUnsafeCreateRetryableTicket
  '*': { method: string, arguments: any[] } 
}






interface IIInboxTxCaller {
    createRetryableTicket (sender: TSender, to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    depositEth (sender: TSender, ): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    initialize (sender: TSender, _bridge: TAddress, _sequencerInbox: TAddress): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    pause (sender: TSender, ): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    postUpgradeInit (sender: TSender, _bridge: TAddress): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    sendContractTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, value: bigint, data: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    sendL1FundedContractTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, data: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    sendL1FundedUnsignedTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, data: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    sendL2Message (sender: TSender, messageData: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    sendL2MessageFromOrigin (sender: TSender, messageData: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    sendUnsignedTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, value: bigint, data: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    unpause (sender: TSender, ): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
    unsafeCreateRetryableTicket (sender: TSender, to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
}


interface IIInboxTxData {
    createRetryableTicket (sender: TSender, to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike): Promise<TEth.TxLike>
    depositEth (sender: TSender, ): Promise<TEth.TxLike>
    initialize (sender: TSender, _bridge: TAddress, _sequencerInbox: TAddress): Promise<TEth.TxLike>
    pause (sender: TSender, ): Promise<TEth.TxLike>
    postUpgradeInit (sender: TSender, _bridge: TAddress): Promise<TEth.TxLike>
    sendContractTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, value: bigint, data: TBufferLike): Promise<TEth.TxLike>
    sendL1FundedContractTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, to: TAddress, data: TBufferLike): Promise<TEth.TxLike>
    sendL1FundedUnsignedTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, data: TBufferLike): Promise<TEth.TxLike>
    sendL2Message (sender: TSender, messageData: TBufferLike): Promise<TEth.TxLike>
    sendL2MessageFromOrigin (sender: TSender, messageData: TBufferLike): Promise<TEth.TxLike>
    sendUnsignedTransaction (sender: TSender, gasLimit: bigint, maxFeePerGas: bigint, nonce: bigint, to: TAddress, value: bigint, data: TBufferLike): Promise<TEth.TxLike>
    unpause (sender: TSender, ): Promise<TEth.TxLike>
    unsafeCreateRetryableTicket (sender: TSender, to: TAddress, l2CallValue: bigint, maxSubmissionCost: bigint, excessFeeRefundAddress: TAddress, callValueRefundAddress: TAddress, gasLimit: bigint, maxFeePerGas: bigint, data: TBufferLike): Promise<TEth.TxLike>
}


