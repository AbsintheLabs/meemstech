// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { exec } = require("child_process");

async function main() {
  const NETWORK = process.env.NETWORK;

  const memecoins = await hre.ethers.deployContract("Memecoins");

  await memecoins.waitForDeployment();

  console.log(`Memecoin deployed to ${memecoins.target}`);

  exec(
    `npx hardhat verify --network ${NETWORK} ${memecoins.target}`,
    async (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      console.log(error);
    }
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
