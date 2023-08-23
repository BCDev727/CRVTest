// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require("@nomiclabs/hardhat-etherscan");

const hre = require("hardhat");

async function main() {
  // PonziContract contract deploy
  const PonziContract = await hre.ethers.getContractFactory("PonziContract");
  const ponzi = await PonziContract.deploy();
  await ponzi.deployed();

  // PonziContract contract deploy
  const MaliciousContract = await hre.ethers.getContractFactory("MaliciousContract");
  const malicious = await MaliciousContract.deploy();
  await malicious.deployed();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
