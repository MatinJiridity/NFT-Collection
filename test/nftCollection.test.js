const { assert, revertedWith } = require('chai');
const { default: Web3 } = require('web3');
const NFT = artifacts.require("./NFTCollection");
require('chai')
    .use(require('chai-as-promised'))
    .should();


contract('nftCollection', (accounts) => {
    let contract
    // let balance
    let whitelistedAddresses = [
        "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
        "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef",
        "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544",
        "0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2"
    ]

    before(async () => {
        contract = await NFT.deployed()
        // balance = await web3.eth.getBalance(accounts[0])
        // console.log(accounts[0], balance, accounts[1], accounts[2], accounts[3])
    })

    describe('deployment', async () => {
        it('deploy successfully', async () => {
            const address = contract.address
            // console.log(address)
            assert.notEqual(address, '')
            assert.notEqual(address, 0x000)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('check initial data', async function () {
            const cost = await contract.cost();
            const maxSupply = await contract.maxSupply();
            const maxMintAmount = await contract.maxMintAmount();
            const whitelistedAddresses0 = await contract.whitelistedAddresses(0); //accounts[1]
            const isPartner = await contract.isWhitelisted(accounts[2]);

            expect(await contract.name()).to.equal("nftCollection");
            expect(await contract.symbol()).to.equal("NFTC");
            expect(await contract.notRevealedUri()).to.equal("ipfs://Qme3MCZDXaNRDka2NFNASvVLEVEbeWMaEtJzk3JbCL5CCq/hidden");
            assert.equal(cost.toString(), 10000000000000000);
            assert.equal(maxSupply.toString(), 33000);
            assert.equal(maxMintAmount.toString(), 1);
            assert.equal(whitelistedAddresses0, accounts[1]);
            assert.equal(isPartner, true, 'second account is not partner');

            expect(await contract.paused()).to.equal(true);
            expect(await contract.revealed()).to.equal(false);

            await contract.tokenURI(1).should.be.rejected;
        })
    })

    describe('before any sale', async () => {
        it('check able to mint', async function () {
            // Nobody should be able to mint from a paused contract
            await contract.mint(1).should.be.rejected;
            await contract.mintFounders(3, { from: accounts[2] }).should.be.rejected;
            await contract.mint(1, { from: accounts[2], value: 10000000000000000 }).should.be.rejected;

            // The owner should always be able to run mintForAddress
            await contract.mintForAddress(1, accounts[1]);

            // Check balances
            assert.equal((await contract.balanceOf(accounts[1])).toString(), '1');
            assert.equal((await contract.balanceOf(accounts[2])).toString(), '0');
        })
    })

    describe('sale', async () => {
        it('mint checks', async function () {
            await contract.pause(false);
            await contract.mint(1);
            await contract.mint(1, { from: accounts[2], value: 10000000000000000 });
            await contract.mintFounders(1, { from: accounts[2] });
            await contract.mintForAddress(1, accounts[1], { from: accounts[0] });

            // mint without payment should be rejected
            await contract.mint(1, { from: accounts[2] }).should.be.rejected;

            // only partners can mintFounders
            await contract.mintFounders(1).should.be.rejected;
            await contract.mintFounders(101, { from: accounts[2] }).should.be.rejected;

            // try mint over than maxMintAmount should br rejected
            const maxMintAmount = await contract.maxMintAmount();
            await contract.mint(1 + maxMintAmount).should.be.rejected;

            assert.equal((await contract.balanceOf(accounts[2])).toString(), '2');
            assert.equal((await contract.balanceOf(accounts[1])).toString(), '2');
            assert.equal((await contract.balanceOf(accounts[0])).toString(), '1');
        })

        it('supply checks', async function () {
            const totalSupply = await contract.totalSupply();
            const maxSupply = await contract.maxSupply();

            assert.equal(totalSupply.toString(), '5');

            // Try to mint over max supply (before sold-out)
            await contract.mintForAddress(1 + maxSupply, accounts[1]).should.be.rejected;
        })

        it('wallet of owner', async function () {
            const tokensId = await contract.walletOfOwner(accounts[2]);
            const expected = [3, 4]

            const result = []
            for (var i = 0; i < tokensId.length; i++) {
                result.push(tokensId[i].toString());
            }

            assert.equal(result[1], expected[1]);
            assert.equal(result[0], expected[0]);
        })

        it('token URI generation', async function () {
            // before reveald
            expect(await contract.tokenURI(1)).to.equal("ipfs://Qme3MCZDXaNRDka2NFNASvVLEVEbeWMaEtJzk3JbCL5CCq/hidden");

            // after reveald
            await contract.reveal();
            expect(await contract.tokenURI(1)).to.equal("ipfs://QmTDC875kXWmXdHii7QsT6PY6sPyKCxYuXVaFbjB4krcYt/1.json");
        })

        it('Owner only functions', async function () {
            await contract.mintForAddress(1, accounts[1], { from: accounts[2] }).should.be.rejected;
            await contract.reveal({ from: accounts[3] }).should.be.rejected;
            await contract.setCost(10000000, { from: accounts[2] }).should.be.rejected;
            await contract.setmaxMintAmount(10, { from: accounts[4] }).should.be.rejected;
            await contract.setmaxMintAmount(10, { from: accounts[3] }).should.be.rejected;
            await contract.setNotRevealedURI("ipfs://pifjadpifijaspfja/hidden", { from: accounts[1] }).should.be.rejected;
            await contract.setBaseURI("ipfs://pifjadpifijaspssfja/", { from: accounts[2] }).should.be.rejected;
            await contract.setBaseExtension(".sol", { from: accounts[1] }).should.be.rejected;
            await contract.pause(true, { from: accounts[5] }).should.be.rejected;
            await contract.withdraw({ from: accounts[4] }).should.be.rejected;
        })

        it('check balance of contracts', async function () {
            balance = await contract.contractBlanace();
            assert.equal((balance).toString(), '10000000000000000');
            await contract.withdraw();
            balance = await contract.contractBlanace()
            assert.equal((balance).toString(), '0');
        })

    })
})
