const { default: Web3 } = require('web3');
const NFT = artifacts.require("NFTCollection");

module.exports = function (deployer) {
  deployer.deploy(NFT, "nftCollection", "NFTC", "ipfs://QmTDC875kXWmXdHii7QsT6PY6sPyKCxYuXVaFbjB4krcYt/", "ipfs://Qme3MCZDXaNRDka2NFNASvVLEVEbeWMaEtJzk3JbCL5CCq/hidden");
};
