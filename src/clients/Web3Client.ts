import di from 'a-di';
import memd from 'memd';
import Web3 from 'web3';
import { Wallet } from 'ethers';

import type { AbiItem } from 'web3-utils';
import type { TAddress } from '@dequanto/models/TAddress';
import type { TPlatform } from '@dequanto/models/TPlatform';
import type { TransactionRequest } from '@ethersproject/abstract-provider';
import type { BlockTransactionString, Syncing } from 'web3-eth';
import type { IWeb3Client, IWeb3ClientOptions } from './interfaces/IWeb3Client';
import type { BlockNumber, Log, LogsOptions, PastLogsOptions, TransactionConfig, Transaction, TransactionReceipt, WebsocketProvider, HttpProvider } from 'web3-core';
import type { Subscription } from 'web3-core-subscriptions';
import { ClientPool, IPoolClientConfig, IPoolWeb3Request, WClient } from './ClientPool';
import { ClientPoolTrace } from './ClientPoolStats';
import { BlockDateResolver } from '@dequanto/blocks/BlockDateResolver';
import { $number } from '@dequanto/utils/$number';
import { $txData } from '@dequanto/utils/$txData';
import { $logger } from '@dequanto/utils/$logger';
import { ClientEventsStream } from './ClientEventsStream';
import { $abiUtils } from '@dequanto/utils/$abiUtils';
import { ClientDebugMethods } from './debug/ClientDebugMethods';
import { Web3BatchRequests } from './Web3BatchRequests';
import { $web3Abi } from './utils/$web3Abi';
import { $require } from '@dequanto/utils/$require';
import { $is } from '@dequanto/utils/$is';
import { $hex } from '@dequanto/utils/$hex';
import { $promise } from '@dequanto/utils/$promise';
import { $bigint } from '@dequanto/utils/$bigint';

export abstract class Web3Client implements IWeb3Client {

    public TIMEOUT = 3 * 60 * 1000;

    abstract platform: TPlatform;
    abstract chainId: number;
    abstract chainToken: string;
    abstract defaultGasLimit: number;

    defaultTxType: 1 | 2 = 2;

    async sign(txData: TransactionRequest, privateKey: string): Promise<string> {
        let wallet = new Wallet(privateKey);
        let json = $txData.getJson(txData, this);
        let tx = await wallet.signTransaction(json);
        return tx;
    }


    public options: IWeb3ClientOptions;
    public pool: ClientPool;
    public debug:ClientDebugMethods;

    constructor (options: IWeb3ClientOptions)
    constructor (endpoints: IPoolClientConfig[] )
    constructor (mix: IWeb3ClientOptions | IPoolClientConfig[]) {
        if (Array.isArray(mix)) {
            this.options = { endpoints: mix }
        } else if (mix != null) {
            this.options = mix;
        }

        if (this.options.endpoints == null && this.options.web3 == null) {
            console.dir(this.options, { depth: null });
            throw new Error(`Neither Node endpoints nor web3 instance provided`);
        }
        this.pool = new ClientPool(this.options);
        this.debug = new ClientDebugMethods(this, this.options.debug)
    }

    getEventStream (address: TAddress, abi: AbiItem[], event: string) {
        let eventAbi = abi.find(x => x.type === 'event' && x.name === event);
        if (eventAbi == null) {
            let events = abi.filter(x => x.type === 'event').map(x => x.name).join(', ');
            throw new Error(`Event "${event}" not present in ABI. Events: ${ events }`);
        }
        let stream = new ClientEventsStream(address, eventAbi);
        this
            .subscribe('logs', {
                address: address,
                fromBlock: 'latest',
                topics: [
                    $abiUtils.getMethodHash(eventAbi)
                ]
            })
            .then(subscription => {
                stream.fromSubscription(subscription);
            }, error => {
                stream.error(error);
            });

        return stream;
    }

    with <TResult> (fn: (web3: Web3) => Promise<TResult>) {
        return this.pool.call(fn);
    }
    withSync <TResult> (fn: (web3: Web3) => TResult) {
        return this.pool.callSync(fn);
    }
    async getWeb3 (options?: IPoolWeb3Request) {
        return await this.pool.getWeb3(options);
    }
    async getNodeURL (options?: IPoolWeb3Request) {
        return await this.pool.getNodeURL(options);
    }

    subscribe(
        type: 'logs',
        options: LogsOptions,
        callback?: (error: Error, log: Log) => void
    ): Promise<Subscription<Log>>;
    subscribe(
        type: 'syncing',
        callback?: (error: Error, result: Syncing) => void
    ): Promise<Subscription<Syncing>>;
    subscribe(
        type: 'newBlockHeaders',
        callback?: (error: Error, blockHeader: BlockTransactionString) => void
    ): Promise<Subscription<BlockTransactionString>>;
    subscribe(
        type: 'pendingTransactions',
        callback?: (error: Error, transactionHash: string) => void
    ): Promise<Subscription<string>>;
    async subscribe (...args): Promise<Subscription<any>>{
        let wClient = await this.pool.getWrappedWeb3({ ws: true });
        await wClient.ensureConnected();
        return wClient.web3.eth.subscribe(...args as Parameters<Web3['eth']['subscribe']>);
    }

    readContract (data: Web3BatchRequests.IContractRequest) {
        let { address, method, abi: abiMix, options, blockNumber, arguments: params } = data;
        let abis = $web3Abi.ensureAbis(abiMix);
        return this.pool.call(async web3 => {

            let sig = abis[0].signature;

            let contract = new web3.eth.Contract(abis, address);
            let callArgs = [];
            if (options != null) {
                // Clone options, as seems web3js mutates options, which collides with parallel requests
                callArgs[0] = { ...options };
            }
            if (blockNumber != null) {
                callArgs[0] = null;
                callArgs[1] = blockNumber;
            }
            if (sig) {
                // If signature was provided in ABI (ensure we reset it to ABI, as eth.Contract constructor recalculates method signatures)
                abis[0].signature = sig;
            }
            let result = await contract.methods[method](...params).call(...callArgs);
            return result;
        }, {
            trace: ClientPoolTrace.createContractCall(address, method, params)
        });
    }

    readContractBatch (requests: Web3BatchRequests.IContractRequest[]) {
        let trace = new ClientPoolTrace();
        trace.action = `Batch requests: ${ requests.map(x => x.address) }`;
        return this.pool.call(async web3 => {
            let batch = new Web3BatchRequests.BatchRequest(web3, requests);
            return batch.execute();
        }, {
            trace,
            batchRequestCount: requests.length
        });
    }

    encodeParameters (types: any[], paramaters: any[]) {
        return this.pool.callSync(web3 => {
            return web3.eth.abi.encodeParameters(types, paramaters);
        });
    }

    getBalance (address: TAddress, blockNumber?: number): Promise<bigint> {
        return this.pool.call(async web3 => {
            let weiStr = await web3.eth.getBalance(address, blockNumber);
            return BigInt(weiStr);
        });
    }
    getBalances (addresses: TAddress[], blockNumber?: number): Promise<bigint[]> {
        return this.pool.call(async web3 => {
            let reqs = addresses.map(address => cb => (web3.eth.getBalance as any).request(address, blockNumber, cb));
            let batch = new Web3BatchRequests.BatchRequest<string>(web3, reqs);
            let weiStringsResults = await batch.execute();
            return weiStringsResults.map(x => BigInt(x.result));
        }, { batchRequestCount: addresses.length });
    }
    getTransactionCount(address: TAddress, type?: 'pending' | string) {
        return this.pool.call(web3 => {
            return web3.eth.getTransactionCount(address, type);
        });
    }
    isSyncing () {
        return this.pool.call(web3 => {
            return web3.eth.isSyncing();
        });
    }
    getTransaction (txHash: TAddress, opts?: IPoolWeb3Request) {
        return this.pool.call(web3 => {
            return web3.eth.getTransaction(txHash);
        }, opts);
    }
    getTransactions (txHashes: TAddress[], opts?: IPoolWeb3Request): Promise<Transaction[]> {
        return this.pool.call(async web3 => {
            let reqs = txHashes.map(hash => cb => (web3.eth.getTransaction as any).request(hash, cb));
            let batch = new Web3BatchRequests.BatchRequest(web3, reqs);
            let results = await batch.execute();
            return results.map(x => x.result);
        }, {
            ...(opts ?? {}),
            batchRequestCount: txHashes.length
        });
    }
    getTransactionReceipt (txHash: TAddress) {
        return this.pool.call(web3 => {
            return web3.eth.getTransactionReceipt(txHash);
        });
    }
    getTransactionReceipts (hashes: TAddress[]): Promise<TransactionReceipt[]> {
        return this.pool.call(async web3 => {
            let reqs = hashes.map(hash => cb => (web3.eth.getTransactionReceipt as any).request(hash, cb));
            let batch = new Web3BatchRequests.BatchRequest(web3, reqs);
            let results = await batch.execute();
            return results.map(x => x.result);
        }, { batchRequestCount: hashes.length });
    }
    getTransactionTrace (hash: string) {
        return this.pool.call(async web3 => {
            let eth = web3.eth as (typeof web3.eth & { traceTransaction });

            if (typeof eth.traceTransaction !== 'function') {
                web3.eth.extend({
                    methods: [
                        {
                            name: 'traceTransaction',
                            call: 'debug_traceTransaction',
                            params: 1,
                        }
                    ]
                })
            }

            let result = await eth.traceTransaction(hash);
            return result;

        }, {
            node: {
                traceable: true
            }
        });
    }
    getBlock (nr: number): Promise<BlockTransactionString> {
        return this.pool.call(web3 => {
            return web3.eth.getBlock(nr);
        });
    }
    getBlocks (nrs: number[]): Promise<BlockTransactionString[]> {
        return this.pool.call(async web3 => {
            let reqs = nrs.map(nr => cb => (web3.eth.getBlock as any).request(nr, cb));
            let batch = new Web3BatchRequests.BatchRequest(web3, reqs);
            let results = await batch.execute();
            return results.map(x => x.result);
        }, {
            batchRequestCount: nrs.length
        });
    }
    getCode (address: TAddress) {
        return this.pool.call(async web3 => {
            let code = await web3.eth.getCode(address);
            if (code === '0x' || code === '') {
                code = null;
            }
            return code;
        })
    }
    getPendingTransactions () {
        return this.pool.call(web3 => {
            return web3.eth.getPendingTransactions();
        });
    }
    getPoolStatus(): Promise<{ baseFee: bigint, pending: number, queued: number }> {
        return this.pool.call(async web3 => {
            let eth = web3.eth as any;
            if (eth.txpool == null) {
                eth.extend({
                    property: 'txpool',
                    methods: [{
                      name: 'content',
                      call: 'txpool_content'
                    },{
                      name: 'inspect',
                      call: 'txpool_inspect'
                    },{
                      name: 'status',
                      call: 'txpool_status'
                    }]
                  });
            }
            let status = await eth.txpool.status();
            return {
                baseFee: BigInt(status.baseFee),
                pending: Number(status.pending),
                queued: Number(status.queued),
            }
        });
    }
    getStorageAt (address: TAddress, position: string | number | bigint, blockNumber?: number) {
        return this.pool.call(web3 => {
            return web3.eth.getStorageAt(address, <any> position, blockNumber);
        });
    }
    getStorageAtBatched (address: TAddress, slots: (string | number | bigint)[], blockNumber?: number) {
        return this.pool.callBatched({
            async requests (web3) {
                return slots.map(position => cb => (web3.eth.getStorageAt as any).request(address, position, blockNumber, cb));
            }
        });
    }
    getGasPrice (): Promise<{ price: bigint, base?: bigint, priority?: bigint }> {
        return this.pool.call(web3 => {
            return web3.eth.getGasPrice().then(x => {
                return {
                    price: BigInt(x)
                };
            });
        });
    }
    getGasEstimation (from: TAddress, tx: TransactionRequest | TransactionConfig) {
        return this.pool.call(async web3 => {
            let txData = {
                from: from,
                to: tx.to as string,
                value: tx.value as any,
                data: tx.data as any,
                nonce: tx.nonce as any,
            };
            let gasAmount = await web3.eth.estimateGas(txData);
            return gasAmount;
        })
    }
    async getAccounts (options?: IPoolWeb3Request): Promise<TAddress[]> {
        let web3 = await this.getWeb3(options);
        return web3.eth.getAccounts();
    }
    async getChainId (options?: IPoolWeb3Request): Promise<number> {
        let web3 = await this.getWeb3(options);
        return web3.eth.getChainId()
    }

    async switchChain (params: { chainId: number | string }, options: IPoolWeb3Request): Promise<any> {
        let web3 = await this.getWeb3(options);
        if (typeof (web3.eth.currentProvider as any).request !== 'function') {
            throw new Error(`Current provider doesn't have request method`);
        }
        return (web3.eth.currentProvider as any).request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: $number.toHex(params.chainId) }],
        });
    }

    sendSignedTransaction(signedTxBuffer: string) {
        return this.pool.callPromiEvent(web3 => {
            return web3.eth.sendSignedTransaction(signedTxBuffer);
        }, { preferSafe: true, distinct: true });
    }

    sendTransaction(data: TransactionConfig) {
        return this.pool.callPromiEvent(web3 => {
            return web3.eth.sendTransaction(data);
        }, { preferSafe: true, distinct: true });
    }

    getBlockNumber () {
        return this.pool.call(web3 => {
            return web3.eth.getBlockNumber();
        });
    }

    call (tx: TransactionConfig): Promise<any> {
        for (let key in tx) {
            let val = tx[key];
            switch (typeof val) {
                case 'number':
                    tx[key] = $number.toHex(val);
                    break;
                case 'bigint':
                    tx[key] = $bigint.toHex(val);
                    break;
            }
        }
        return this.pool.call(web3 => {
            let provider = web3.currentProvider as HttpProvider;
            return $promise.fromCallbackCtx(provider, provider.send, {
                jsonrpc: '2.0',
                method: 'eth_call',
                params: [ tx, 'latest' ],
                id: Date.now()
            });
        });
    }

    @memd.deco.memoize({ maxAge: 30 })
    getBlockNumberCached () {
        return this.pool.call(web3 => {
            return web3.eth.getBlockNumber();
        });
    }

    async getPastLogs (options: PastLogsOptions): Promise<Log[]> {

        options.fromBlock = await Blocks.getBlock(this, options.fromBlock, 0);
        options.toBlock = await Blocks.getBlock(this, options.toBlock, 'latest');

        // ensure numbers, bigints, bools are in HEX
        options.topics = options.topics.map(mix => {
            if (mix != null && Array.isArray(mix) === false) {
                return $hex.toHex(mix as any)
            }
            return mix;
        });

        // ensure all topics are in 32-byte
        options.topics = options.topics?.map(topic => {
            if (typeof topic === 'string' && topic.startsWith('0x')) {
                return '0x' + topic.substring(2).padStart(64, '0');
            }
            return topic;
        });

        let MAX = this.pool.getOptionForFetchableRange();
        let [ fromBlock, toBlock ] = await Promise.all([
            Blocks.getBlockNumber(this, options.fromBlock as any),
            Blocks.getBlockNumber(this, options.toBlock as any),
        ]);
        return await RangeWorker.fetchWithLimits(this, options, {
            maxBlockRange: MAX,
            maxResultCount: null,
        }, {
            fromBlock,
            toBlock
        });
    }

    getNodeInfos () {
        return this.pool.getNodeInfos();
    }
    getNodeStats () {
        return this.pool.getNodeStats();
    }

    static url<T extends Web3Client> (options: IWeb3ClientOptions)
    static url<T extends Web3Client> (endpoints: IPoolClientConfig[], opts?: Partial<IWeb3ClientOptions>)
    static url<T extends Web3Client> (url: string, opts?: Partial<IWeb3ClientOptions>): T
    static url<T extends Web3Client> (mix: IWeb3ClientOptions | IPoolClientConfig[] | string, opts?: Partial<IWeb3ClientOptions>): T {
        const Ctor: any = this;
        let options: IWeb3ClientOptions;
        if (typeof mix === 'string') {
            options = { endpoints: [ { url: mix }] }
        } else if (Array.isArray(mix)) {
            options = { endpoints: mix }
        } else {
            options = mix;
        }
        const param = {
            ...options,
            ...(opts ?? {})
        };
        return new Ctor(param);
    }
}


namespace RangeWorker {

    export async function fetchWithLimits (
        client: Web3Client,
        options: PastLogsOptions,
        limits: { maxBlockRange?: number, maxResultCount?: number },
        ranges: { fromBlock: number, toBlock: number }
    ) {
        let { fromBlock, toBlock } = ranges;

        $require.Number(fromBlock, `FromBlock must be a number`);
        $require.Number(toBlock, `ToBlock must be a number`);

        let { maxBlockRange } = limits;
        let range = toBlock - fromBlock;

        if (maxBlockRange == null || range <= maxBlockRange) {
            return fetch (client, options, ranges, limits);
        }

        $require.Number(maxBlockRange, `MaxBlockRange must be a number`);
        $require.gt(maxBlockRange, 0, `MaxBlockRange must be > 0`);

        let logs = [];
        let cursor = fromBlock;
        let pages = Math.ceil(range / maxBlockRange);
        let page = 0;
        let complete = false;
        while (complete === false) {
            ++page;
            let end = cursor + maxBlockRange;
            if (end > toBlock) {
                end = options.toBlock as number;
                complete = true;
            }
            $logger.log(`Get past logs paged: ${page}/${pages} (Block start: ${cursor}). Loaded ${logs.length}`);
            let paged = await fetch(client, options, {
                fromBlock: cursor,
                toBlock: end ?? undefined,
            }, limits);
            logs.push(...paged);
            cursor += maxBlockRange + 1;
        }
        return logs;

    };


    async function fetch (
        client: Web3Client,
        options: PastLogsOptions,
        range: { fromBlock: number, toBlock: number },
        knownLimits: { maxBlockRange?: number, maxResultCount?: number },
    ) {

        let currentWClient: WClient;
        try {
            let blockRange = range.toBlock - range.fromBlock;
            let paged = await client.pool.call((web3, wClient) => {
                currentWClient = wClient;
                return web3.eth.getPastLogs({
                    ...options,
                    fromBlock: range.fromBlock,
                    toBlock: range.toBlock ?? undefined,
                });
            }, {
                blockRangeCount: blockRange
            });
            return paged;
        } catch (error) {
            /**
             * query returned more than 10000 results
             */
            $logger.log(`Range worker request: ${range.fromBlock}-${range.toBlock}. ${error.message.trim()}. Splitting range.`);

            if ($is.Number(options.fromBlock) === false || $is.Number(options.toBlock) === false) {
                let [ fromBlock, toBlock ] = await Promise.all([
                    Blocks.getBlock(client, options.fromBlock, 0),
                    Blocks.getBlock(client, options.toBlock, 'latest'),
                ]);
                let [ fromBlockNr, toBlockNr ] = await Promise.all([
                    Blocks.getBlockNumber(client, fromBlock),
                    Blocks.getBlockNumber(client, toBlock),
                ]);

                options.fromBlock = fromBlockNr;
                options.toBlock = toBlockNr;
            }

            let matchCountLimit = /(?<count>\d+) results/.exec(error.message);
            if (matchCountLimit) {
                let count = Number(matchCountLimit.groups.count);

                let half = Math.floor((range.toBlock - range.fromBlock) / 2);
                let rangeA = {
                    fromBlock: range.fromBlock,
                    toBlock: range.fromBlock + half
                };
                let arr1 = await fetchWithLimits(client, options, {
                    ...knownLimits,
                    maxResultCount: count
                }, rangeA);

                let rangeB = {
                    fromBlock: range.fromBlock + half,
                    toBlock: range.toBlock
                };
                let arr2 = await fetchWithLimits(client, options, {
                    ...knownLimits,
                    maxResultCount: count
                }, rangeB);

                return [ ...(arr1 ?? []), ...(arr2 ?? []) ]
            }

            let maxRangeMatch = /\b(?<maxRange>\d+)\b/.exec(error.message)?.groups?.maxRange;
            if (maxRangeMatch && knownLimits.maxBlockRange == null) {
                // handle unknown range, otherwise throw
                let rangeLimit = Number(maxRangeMatch);
                currentWClient.updateBlockRangeInfo({ blocks: rangeLimit });
                return await fetchWithLimits(client, options, {
                    ...knownLimits,
                    maxBlockRange: rangeLimit
                }, range);
            }
            if (/\brange\b/.test(error.message)) {
                // Generic "block range is too wide"
                let rangeLimit = Math.round((knownLimits.maxBlockRange ?? 100000) * .8);
                if (rangeLimit > 100) {
                    // otherwise too small range
                    currentWClient.updateBlockRangeInfo({ blocks: rangeLimit });
                    return await fetchWithLimits(client, options, {
                        ...knownLimits,
                        maxBlockRange: rangeLimit
                    }, range);
                }
            }

            throw error;
        }
    }
}

namespace Blocks {
    export async function getBlock (client: Web3Client, block: BlockNumber | Date, $default: string | number): Promise<string | number> {
        if (block == null) {
            return $default;
        }
        if (block instanceof Date) {
            let resolver = di.resolve(BlockDateResolver, client);
            return resolver.getBlockNumberFor(block);
        }
        if (typeof block === 'number' || typeof block === 'string') {
            return block;
        }
        if ('toNumber' in block) {
            return block.toNumber();
        }
        return block;
    };
    export async function getBlockNumber (client: Web3Client, block: number | string) {
        if (typeof block === 'number') {
            return block;
        }
        if (block == null || block === 'latest') {
            return client.getBlockNumber();
        }
        if (block.startsWith('0x')) {
            return Number(block);
        }
        throw new Error(`Invalid block number`);
    };
}
