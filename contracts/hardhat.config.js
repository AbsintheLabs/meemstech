require("@nomicfoundation/hardhat-toolbox");

//Require .env
require("dotenv").config({ path: __dirname + "/.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
  },
  defaultNetwork: process.env.NETWORK,
  etherscan: {
    apiKey: process.env.BASESCAN_API_KEY,
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://api.basescan.org/api",
        },
      },
    ],
  },
  networks: {
    base: {
      url: process.env.BASE_URL,
      accounts: [process.env.DEPLOYER_ACCOUNT_PRIVATE_KEY],
    },
    base_testnet: {
      url: process.env.BASE_TESTNET_URL,
      accounts: [process.env.DEPLOYER_ACCOUNT_PRIVATE_KEY],
    },
  },
};
