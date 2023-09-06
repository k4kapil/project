let publicAddress;

async function walletCreation() {
  const ethers = require("ethers");
  const wallet = ethers.Wallet.createRandom();
  console.log("address:", wallet.address);
  console.log("mnemonic:", wallet.mnemonic.phrase);
  console.log("privateKey:", wallet.privateKey);

  publicAddress = wallet.address;
}
