import { File } from 'atma-io';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { GnosisSafeFactory } from '@dequanto/safe/GnosisSafeFactory';
import { GnosisSafe } from '@dequanto-contracts/gnosis/GnosisSafe';
import { GnosisSafeHandler } from '@dequanto/safe/GnosisSafeHandler';
import { InMemoryServiceTransport } from '@dequanto/safe/transport/InMemoryServiceTransport';
import { ContractWriter } from '@dequanto/contracts/ContractWriter';
import { SafeAccount } from '@dequanto/models/TAccount';
import { FileServiceTransport } from '@dequanto/safe/transport/FileServiceTransport';
import { $bigint } from '@dequanto/utils/$bigint';
import { $promise } from '@dequanto/utils/$promise';
import { $address } from '@dequanto/utils/$address';
import { $abiParser } from '@dequanto/utils/$abiParser';
import { GnosisSafeService } from '@dequanto/safe/GnosisSafeService';
import { $sig } from '@dequanto/utils/$sig';
import { l } from '@dequanto/utils/$logger';

const provider = new HardhatProvider();
const client = provider.client();
const explorer = provider.explorer();


UTest({
    async $before () {
        try {
            await File.removeAsync('./test/tmp/safe-tx.json');
        } catch (error) { }
    },
    async 'should sign tx hash' () {
        const key = `0x66e91912f68828c17ad3fee506b7580c4cd19c7946d450b4b0823ac73badc878`;
        const address = `0x6a2EB7F6734F4B79104A38Ad19F1c4311e5214c8`;
        const txHash = `0x1ed9d878f89585977e98425d5cedf51027c041e414bb471d64519f8f510bb555`;

        const signature = await $sig.sign(txHash, { key });
        eq_(signature.signature, `0xc0df6a1b659d56d3d23f66cbd1c483467ea68a428fea7bbbe0a527d43d8681f616af33344035f36c08218718480374dada0fe6cdb266d0182a4225d0e9c227181b`);

        const addressBack = $sig.recover(txHash, signature.signature);
        eq_(addressBack, address);
    },
    async 'parse safe transaction' () {
        let tx = {
            data: `0x6a761202000000000000000000000000abcdef00aa3e981100a9beca4e685f962f0cf6c900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000043884d635000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000082a9cb55b0b4dcd3417da119433bad730ae9c1fa1bb605338d61d2e7914b7033dd72ae4769ef8f2d47bd5a52415c560740cb83cbb1932e66fd2633775792923f4c1bdc5fe2fd7d35ee6503a247f2a2ee0d374737f7945c20034b410a0006e276cb247273010ae24252a17c051637e6e289b8cd73cb204a31dcfe386aad7f48f7b3341b000000000000000000000000000000000000000000000000000000000000`
        } as const;
        explorer.localDb.push({
            name: 'DemoAirdrop',
            address: '0xAbcdef00Aa3E981100a9becA4E685f962f0cF6C9',
            abi: [
                $abiParser.parseMethod(`airdrop()`)
            ]
        });
        let service = new GnosisSafeService(client, explorer);
        let info = await service.decodeSafeTx(tx.data, { decodeContractCall: true });
        eq_(info.method, 'airdrop');
        eq_(info.arguments.length, 0);
    },
    async 'parse multisend transaction' () {
        let abi = $abiParser.parseMethod(`swap(address executor,(address,address,address,address,uint256,uint256,uint256) desc, bytes permit,bytes data)`);

        let tx = {
            data: `0x6a76120200000000000000000000000040b2accbd92bca938b02010e17a5b8929b49130d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005a000000000000000000000000000000000000000000000000000000000000004248d80ff0a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000003d600dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e812aa3caf00000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf33588000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf33588000000000000000000000000be3972d8cb690d5222de0c8c6659643de37a8667000000000000000000000000000000000000000000000000000000290c3f16b400000000000000000000000000000000000000000000000000000028f4579b9b0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014a00000000000000000000000000000000012c0000fe0000e40000ca00001a0020d6bdbf78dac17f958d2ee523a2206206994597c13d831ec75120bebc44782c7db0a1a60cb6fe97d0b483032ff1c7dac17f958d2ee523a2206206994597c13d831ec700443df021240000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002895e380d60020d6bdbf78a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480020d6bdbf78a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4880a06c4eca27a0b86991c6218b36c1d19d4a2e9eb0ce3606eb481111111254eeb25477b68fb85ed929f73a9605820000000000000000000000000000000000000000000065575cda0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008287a098779297757ead5ca2f15f6ea91d519de8786a7aca2b7ac74a0591ec120c77a45585b24f0fa3d2b79b0f2786db60c72fd634630cf86806ea4c243e9fdd291b0000000000000000000000009efa321041ee6c4c5ac9e1d10870a754361c1927000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000`
        } as const;

        explorer.registerAbi([{
            name: 'Multisend',
            address: '0x40b2accbd92bca938b02010e17a5b8929b49130d',
            abi: [
                $abiParser.parseMethod(`multiSend(bytes)`)
            ]
        }, {
            name: 'USDT',
            address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            abi: [
                $abiParser.parseMethod(`approve(address,uint256)`)
            ]
        }, {
            name: '1inch',
            address: '0x1111111254eeb25477b68fb85ed929f73a960582',
            abi: [
                $abiParser.parseMethod(`swap(address executor,(address srcToken, address dstToken, address srcReceiver, address dstReceiver, uint256 amount, uint256 mintAmountReturn, uint256 flags) desc, bytes permit, bytes data)`)
            ]
        }]);

        let service = new GnosisSafeService(client, explorer);
        let info = await service.decodeSafeTx(tx.data, { decodeContractCall: true });
        eq_(info.method, 'multiSend');
        eq_(info.arguments.length, 2);

        let [ opApprove, opSwap ] = info.arguments;
        eq_(opApprove.address, '0xdac17f958d2ee523a2206206994597c13d831ec7');
        eq_(opApprove.method, 'approve');
        eq_(opSwap.address, '0x1111111254eeb25477b68fb85ed929f73a960582');
        eq_(opSwap.method, 'swap');
    },

    async 'create in-memory safe and manually receive tokens' () {
        let provider = new HardhatProvider();
        let client = provider.client();
        let owner1 = provider.deployer();
        let owner2 = provider.deployer(1);

        let { safe, freeTokenContract } = await SafeTestableFactory.prepare();
        eq_($address.isValid(safe.safeAddress), true, `Invalid address ${safe.safeAddress}`);

        let contract = new GnosisSafe(safe.safeAddress, client);
        let nonce = await contract.nonce();
        eq_(Number(nonce), 0);

        let handler = new GnosisSafeHandler({
            safeAddress: safe.safeAddress,
            owner: owner1,
            client: client,
            transport: new InMemoryServiceTransport(client, owner1)
        });
        let balanceBefore = await freeTokenContract.balanceOf(safe.safeAddress);
        eq_($bigint.toEther(balanceBefore, 18), 0);

        '> airdrop some tokens to sender (safe)'
        let writer = new ContractWriter(freeTokenContract.address, client);
        let txWriter = await writer.writeAsync(<SafeAccount>{
            address: safe.safeAddress,
            operator: owner1,
        }, 'airdrop()', [], {
            builderConfig: {
                send: 'manual',
                gasEstimation: false,
            }
        });

        let { safeTxHash: hash, threshold } = await handler.createTransaction(txWriter, 0n);

        await handler.confirmTx(hash, owner2);
        await handler.confirmTx(hash, owner1);
        let tx = await handler.submitTransaction(hash);

        let receipt = await tx.wait();
        eq_(receipt.status, true);

        let balance = await freeTokenContract.balanceOf(safe.safeAddress);
        let eth = $bigint.toEther(balance, 18);
        eq_(eth, 10);

        nonce = await contract.nonce();
        eq_(Number(nonce), 1);
    },

    async 'create file safe and manually receive tokens ' () {
        let provider = new HardhatProvider();
        let client = provider.client();
        let owner1 = provider.deployer(0);
        let owner2 = provider.deployer(1);

        let { safe, freeTokenContract } = await SafeTestableFactory.prepare();

        eq_($address.isValid(safe.safeAddress), true, `Invalid address ${safe.safeAddress}`);

        let contract = new GnosisSafe(safe.safeAddress, client);
        let nonce = await contract.nonce();
        eq_(Number(nonce), 0);


        let balanceBefore = await freeTokenContract.balanceOf(safe.safeAddress);
        eq_($bigint.toEther(balanceBefore, 18), 0);


        '> airdrop some tokens to sender (safe)'

        let writer = new ContractWriter(freeTokenContract.address, client);
        let safeAccount = <SafeAccount>{
            type: 'safe',
            address: safe.safeAddress,
            operator: owner1,
        };

        let confirmationsFile = './test/tmp/safe-tx.json';
        let txWriter = await writer.writeAsync(safeAccount, 'airdrop()', [], {
            writerConfig: {
                safeTransport: new FileServiceTransport(client, owner1, confirmationsFile)
            }
        });

        let safeTx = await $promise.fromEvent(txWriter, 'safeTxProposed');

        let arr = await File.readAsync<any>(confirmationsFile);
        let json = arr.find(x => x.safeTxHash === safeTx.safeTxHash);

        eq_(json.safeTxHash, safeTx.safeTxHash);

        let sig1 = await $sig.sign(safeTx.safeTxHash, owner1);
        let sig2 = await $sig.sign(safeTx.safeTxHash, owner2);
        json.confirmations = [
            { owner: owner1.address, signature: sig1.signature },
            { owner: owner2.address, signature: sig2.signature },
        ];

        await File.writeAsync(confirmationsFile, arr);


        let receipt = await txWriter.wait();
        eq_(receipt.status, true);

        let balance = await freeTokenContract.balanceOf(safe.safeAddress);
        let eth = $bigint.toEther(balance, 18);
        eq_(eth, 10);

        nonce = await contract.nonce();
        eq_(Number(nonce), 1);
    }
})

class SafeTestableFactory {

    static async prepare () {
        let provider = new HardhatProvider();
        let client = provider.client();
        let owner1 = provider.deployer(0);
        let owner2 = provider.deployer(1);

        l`Deploy GnosisSafeProxyFactory`;
        const { contract: proxyFactoryContract, abi: proxyFactoryAbi } = await provider.deploySol('/test/fixtures/gnosis/proxies/GnosisSafeProxyFactory.sol', {
            client,
            deployer: owner1
        });
        l`Deploy GnosisSafe`;
        const { contract: safeContract, abi: safeAbi } = await provider.deploySol('/test/fixtures/gnosis/GnosisSafe.sol', {
            client,
            deployer: owner1
        });
        l`Deploy MultiSend`;
        const { contract: multiSendContract, abi: multiSendAbi } = await provider.deploySol('/test/fixtures/gnosis/libraries/MultiSend.sol', {
            client,
            deployer: owner1
        });

        l`Deploy safe instance`;
        let safe = await GnosisSafeFactory.create(owner1, client, {
            owners: [
                owner1.address,
                owner2.address
            ],
            contracts: {
                [client.chainId + '']: {
                    multiSendAddress: multiSendContract.address,
                    multiSendAbi: multiSendAbi,

                    safeMasterCopyAddress: safeContract.address,
                    safeMasterCopyAbi: safeAbi,

                    safeProxyFactoryAbi: proxyFactoryAbi,
                    safeProxyFactoryAddress: proxyFactoryContract.address
                }
            }
        });
        l`Deploy FreeToken`;
        const { contract: freeTokenContract, abi: freeTokenAbi } = await provider.deploySol('/test/fixtures/contracts/FreeToken.sol', {
            client,
            deployer: owner1
        });
        return {
            safe, freeTokenContract
        }
    }
}
