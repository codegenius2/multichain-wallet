import EthereumWallet from '../src/wallet_class/ethereum'
import SAMPLE_DATA from './sample_data'

jest.setTimeout(50000)

describe("Wallet Test", () => {
    describe("Ethereum Wallet Test", () => {
        let ethereumWallet: EthereumWallet;
        
        beforeAll(() => {
            ethereumWallet = new EthereumWallet(SAMPLE_DATA.ETHEREUM.GOERLI_RPC)
        })

        it("Check Initial wallet data", () => {
            expect(typeof ethereumWallet.privateKey).toBe('string')
            expect(typeof ethereumWallet.address).toBe('string')
            expect(typeof ethereumWallet.chainId).toBe('number')
        })

        it("createWallet()", () => {
            const wallet = ethereumWallet.createWallet()
            
            expect(typeof wallet.mnemonic).toBe('string')
            expect(typeof wallet.privateKey).toBe('string')
            expect(typeof wallet.address).toBe('string')
            expect(typeof wallet.nonce).toBe('number')
        })

        it("recoverWallet()", () => {
            const wallet = ethereumWallet.recoverWallet(SAMPLE_DATA.COMMON.MNEMONIC)

            expect(typeof wallet.privateKey).toBe('string')
            expect(typeof wallet.address).toBe('string')
            expect(typeof wallet.mnemonic).toBe('string')
            expect(typeof wallet.nonce).toBe('number')
        })

        it("createMasterSeedFromMnemonic()", async () => {
            const seed = await ethereumWallet.createMasterSeedFromMnemonic(SAMPLE_DATA.COMMON.MNEMONIC)

            expect(typeof seed).toBe('object')
        })

        it("createAccount()", async () => {
            const seed = await ethereumWallet.createMasterSeedFromMnemonic(SAMPLE_DATA.COMMON.MNEMONIC)
            const account = await ethereumWallet.createAccount(seed, 0)

            expect(typeof account.privateKey).toBe('string')
            expect(typeof account.address).toBe('string')
        })

        it("importAccount()", async () => {
            const seed = await ethereumWallet.createMasterSeedFromMnemonic(SAMPLE_DATA.COMMON.MNEMONIC)
            const account = await ethereumWallet.createAccount(seed, 0)
            const importedAccount = ethereumWallet.importAccount(account.privateKey)

            expect(account.address.toLowerCase()).toStrictEqual(importedAccount.address.toLowerCase())
        })

        it("getBalance()", async () => {
            const addressBalance = await ethereumWallet.getBalance(SAMPLE_DATA.ETHEREUM.ZERO_ADDRESS)
            const selfBalance = await ethereumWallet.getBalance()
            
            expect(typeof addressBalance).toBe('object')
            expect(typeof selfBalance).toBe('object')
        })

        it("getToken()", () => {})

        it("getTokenBalance()", () => {})

        it("sendEther()", () => {})

        it("tokenApprove()", () => {})

        it("tokenTransfer()", () => {})

        it("isContractAddress()", async () => {
            const isContractAddress_true = await ethereumWallet.isContractAddress(SAMPLE_DATA.ETHEREUM.SAMPLE_TOKEN_ADDRESS)
            const isContractAddress_false = await ethereumWallet.isContractAddress(SAMPLE_DATA.ETHEREUM.ZERO_ADDRESS)

            expect(isContractAddress_true).toBe(true)
            expect(isContractAddress_false).toBe(false)
        })

        it("isERC721NFT()", async () => {
            const isERC721NFT_true = await ethereumWallet.isERC721NFT(SAMPLE_DATA.ETHEREUM.SAMPLE_721_NFT_ADDRESS)
            const isERC721NFT_false = await ethereumWallet.isERC721NFT(SAMPLE_DATA.ETHEREUM.SAMPLE_1155_NFT_ADDRESS)

            expect(isERC721NFT_true).toBe(true)
            expect(isERC721NFT_false).toBe(false)
        })

        it("isERC1155NFT()", async () => {
            const isERC1155NFT_true = await ethereumWallet.isERC1155NFT(SAMPLE_DATA.ETHEREUM.SAMPLE_1155_NFT_ADDRESS)
            const isERC1155NFT_false = await ethereumWallet.isERC1155NFT(SAMPLE_DATA.ETHEREUM.SAMPLE_721_NFT_ADDRESS)

            expect(isERC1155NFT_true).toBe(true)
            expect(isERC1155NFT_false).toBe(false)
        })
    })
})