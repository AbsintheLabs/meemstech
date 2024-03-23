require("@nomicfoundation/hardhat-toolbox");

//Require .env
require("dotenv").config({ path: __dirname + "/.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: process.env.NETWORK,
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://api.basescan.org/api"
        }
      }
    ]
  },
  networks: {
    base: {
      url: process.env.BASE_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  }
};
