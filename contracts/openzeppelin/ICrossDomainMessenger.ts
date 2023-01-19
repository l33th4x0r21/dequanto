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
export class ICrossDomainMessenger extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0x3dbb202b
    async sendMessage (sender: TSender, _target: TAddress, _message: TBufferLike, _gasLimit: number): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'sendMessage'), sender, _target, _message, _gasLimit);
    }

    // 0x6e296e45
    async xDomainMessageSender (): Promise<TAddress> {
        return this.$read('function xDomainMessageSender() returns address');
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

    onFailedRelayedMessage (fn?: (event: TClientEventsStreamData<TLogFailedRelayedMessageParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogFailedRelayedMessageParameters>> {
        return this.$onLog('FailedRelayedMessage', fn);
    }

    onRelayedMessage (fn?: (event: TClientEventsStreamData<TLogRelayedMessageParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogRelayedMessageParameters>> {
        return this.$onLog('RelayedMessage', fn);
    }

    onSentMessage (fn?: (event: TClientEventsStreamData<TLogSentMessageParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogSentMessageParameters>> {
        return this.$onLog('SentMessage', fn);
    }

    extractLogsFailedRelayedMessage (tx: TransactionReceipt): ITxLogItem<TLogFailedRelayedMessage>[] {
        let abi = this.$getAbiItem('event', 'FailedRelayedMessage');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogFailedRelayedMessage>[];
    }

    extractLogsRelayedMessage (tx: TransactionReceipt): ITxLogItem<TLogRelayedMessage>[] {
        let abi = this.$getAbiItem('event', 'RelayedMessage');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogRelayedMessage>[];
    }

    extractLogsSentMessage (tx: TransactionReceipt): ITxLogItem<TLogSentMessage>[] {
        let abi = this.$getAbiItem('event', 'SentMessage');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogSentMessage>[];
    }

    async getPastLogsFailedRelayedMessage (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { msgHash?: TBufferLike }
    }): Promise<ITxLogItem<TLogFailedRelayedMessage>[]> {
        let topic = '0x99d0e048484baa1b1540b1367cb128acd7ab2946d1ed91ec10e3c85e4bf51b8f';
        let abi = this.$getAbiItem('event', 'FailedRelayedMessage');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsRelayedMessage (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { msgHash?: TBufferLike }
    }): Promise<ITxLogItem<TLogRelayedMessage>[]> {
        let topic = '0x4641df4a962071e12719d8c8c8e5ac7fc4d97b927346a3d7a335b1f7517e133c';
        let abi = this.$getAbiItem('event', 'RelayedMessage');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    async getPastLogsSentMessage (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: { target?: TAddress }
    }): Promise<ITxLogItem<TLogSentMessage>[]> {
        let topic = '0xcb0f7ffd78f9aee47a248fae8db181db6eee833039123e026dcbff529522e52a';
        let abi = this.$getAbiItem('event', 'SentMessage');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs= await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi)) as any;
    }

    abi: AbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"msgHash","type":"bytes32"}],"name":"FailedRelayedMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"msgHash","type":"bytes32"}],"name":"RelayedMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"},{"indexed":false,"internalType":"uint256","name":"messageNonce","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"gasLimit","type":"uint256"}],"name":"SentMessage","type":"event"},{"inputs":[{"internalType":"address","name":"_target","type":"address"},{"internalType":"bytes","name":"_message","type":"bytes"},{"internalType":"uint32","name":"_gasLimit","type":"uint32"}],"name":"sendMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"xDomainMessageSender","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogFailedRelayedMessage = {
        msgHash: TBufferLike
    };
    type TLogFailedRelayedMessageParameters = [ msgHash: TBufferLike ];
    type TLogRelayedMessage = {
        msgHash: TBufferLike
    };
    type TLogRelayedMessageParameters = [ msgHash: TBufferLike ];
    type TLogSentMessage = {
        target: TAddress, _sender: TAddress, message: TBufferLike, messageNonce: bigint, gasLimit: bigint
    };
    type TLogSentMessageParameters = [ target: TAddress, _sender: TAddress, message: TBufferLike, messageNonce: bigint, gasLimit: bigint ];

interface IEvents {
  FailedRelayedMessage: TLogFailedRelayedMessageParameters
  RelayedMessage: TLogRelayedMessageParameters
  SentMessage: TLogSentMessageParameters
  '*': any[] 
}



interface IMethodSendMessage {
  method: "sendMessage"
  arguments: [ _target: TAddress, _message: TBufferLike, _gasLimit: number ]
}

interface IMethodXDomainMessageSender {
  method: "xDomainMessageSender"
  arguments: [  ]
}

interface IMethods {
  sendMessage: IMethodSendMessage
  xDomainMessageSender: IMethodXDomainMessageSender
  '*': { method: string, arguments: any[] } 
}





