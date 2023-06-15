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



export class Initializable extends ContractBase {
    constructor(
        public address: TAddress = '',
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }



    $call () {
        return super.$call() as IInitializableTxCaller;;
    }

    $data (): IInitializableTxData {
        return super.$data() as IInitializableTxData;
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

    onInitialized (fn?: (event: TClientEventsStreamData<TLogInitializedParameters>) => void): ClientEventsStream<TClientEventsStreamData<TLogInitializedParameters>> {
        return this.$onLog('Initialized', fn);
    }

    extractLogsInitialized (tx: TransactionReceipt): ITxLogItem<TLogInitialized>[] {
        let abi = this.$getAbiItem('event', 'Initialized');
        return this.$extractLogs(tx, abi) as any as ITxLogItem<TLogInitialized>[];
    }

    async getPastLogsInitialized (options?: {
        fromBlock?: number | Date
        toBlock?: number | Date
        params?: {  }
    }): Promise<ITxLogItem<TLogInitialized>[]> {
        return await this.$getPastLogsParsed('Initialized', options) as any;
    }

    abi: AbiItem[] = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"}]

    
}

type TSender = TAccount & {
    value?: string | number | bigint
}

    type TLogInitialized = {
        version: number
    };
    type TLogInitializedParameters = [ version: number ];

interface IEvents {
  Initialized: TLogInitializedParameters
  '*': any[] 
}





interface IMethods {
  '*': { method: string, arguments: any[] } 
}






interface IInitializableTxCaller {

}


interface IInitializableTxData {

}


