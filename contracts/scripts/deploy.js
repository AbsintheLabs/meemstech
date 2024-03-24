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

  const fremeswtf = await hre.ethers.deployContract("Fremeswtf");

  await fremeswtf.waitForDeployment();

  console.log(`Fremes wtf deployed to ${fremeswtf.target}`);

  exec(
    `npx hardhat verify --network ${NETWORK} ${fremeswtf.target}`,
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
