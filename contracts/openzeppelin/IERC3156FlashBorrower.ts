/**
 *  AUTO-Generated Class: 2023-10-05 18:18
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
import { IBlockChainExplorer } from '@dequanto/explorer/IBlockChainExplorer';
import { SubjectStream } from '@dequanto/class/SubjectStream';


import type { ContractWriter } from '@dequanto/contracts/ContractWriter';
import type { TAbiItem } from '@dequanto/types/TAbi';
import type { TEth } from '@dequanto/models/TEth';


import { Etherscan } from '@dequanto/explorer/Etherscan'
import { EthWeb3Client } from '@dequanto/clients/EthWeb3Client'



export class IERC3156FlashBorrower extends ContractBase {
    constructor(
        public address: TEth.Address = null,
        public client: Web3Client = di.resolve(EthWeb3Client, ),
        public explorer: IBlockChainExplorer = di.resolve(Etherscan, ),
    ) {
        super(address, client, explorer)
    }

    // 0x23e30c8b
    async onFlashLoan (sender: TSender, initiator: TAddress, token: TAddress, amount: bigint, fee: bigint, data: TBufferLike): Promise<TxWriter> {
        return this.$write(this.$getAbiItem('function', 'onFlashLoan'), sender, initiator, token, amount, fee, data);
    }

    $call () {
        return super.$call() as IIERC3156FlashBorrowerTxCaller;;
    }

    $data (): IIERC3156FlashBorrowerTxData {
        return super.$data() as IIERC3156FlashBorrowerTxData;
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







    abi: TAbiItem[] = [{"inputs":[{"internalType":"address","name":"initiator","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"onFlashLoan","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}]


}

type TSender = TAccount & {
    value?: string | number | bigint
}



interface IEvents {
  '*': any[]
}



interface IMethodOnFlashLoan {
  method: "onFlashLoan"
  arguments: [ initiator: TAddress, token: TAddress, amount: bigint, fee: bigint, data: TBufferLike ]
}

interface IMethods {
  onFlashLoan: IMethodOnFlashLoan
  '*': { method: string, arguments: any[] }
}






interface IIERC3156FlashBorrowerTxCaller {
    onFlashLoan (sender: TSender, initiator: TAddress, token: TAddress, amount: bigint, fee: bigint, data: TBufferLike): Promise<{ error?: Error & { data?: { type: string, params } }, result? }>
}


interface IIERC3156FlashBorrowerTxData {
    onFlashLoan (sender: TSender, initiator: TAddress, token: TAddress, amount: bigint, fee: bigint, data: TBufferLike): Promise<TEth.TxLike>
}


