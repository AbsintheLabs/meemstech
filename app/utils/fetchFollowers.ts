const dotenv = require("dotenv");
const { init, fetchQuery } = require("@airstack/node");

// Load environment variables from .env file
dotenv.config();

init(process.env.AIRSTACK_API_KEY as string);

interface QueryResponse {
  data: {
    Socials: {
      Social: Social[];
    };
  };
  error: Error;
}

interface Error {
  message: string;
}

interface Social {
  userAddress: string;
}

export const fetchEvmAddress = async (USER_ID: string) => {
  const query = `query MyQuery {
      Socials(
        input: {
          filter: {
            dappName: { _eq: farcaster }
            identity: { _eq: "fc_fname:${USER_ID}" }
          }
          blockchain: ethereum
        }
      ) {
        Social {
          userAddress
        }
      }
    }`;

  const { data, error }: QueryResponse = await fetchQuery(query);

  if (error) {
    throw new Error(error.message);
  }
  return data.Socials.Social[0]; // assuming you want to return this data
};

export const fetchFName = async (addres: string) => {
  const query = `query MyQuery {
      Socials(
        input: {
          filter: {
            dappName: { _eq: farcaster }
            identity: { _eq: "${addres}" }
          }
          blockchain: ethereum
        }
      ) {
        Social {
          profileName
        }
      }
    }`;

  const { data, error }: QueryResponse = await fetchQuery(query);

  if (error) {
    throw new Error(error.message);
  }
  return data.Socials.Social[0]; // assuming you want to return this data
};

// fetchEvmAddress("vitalik.eth");

// module.exports = { fetchEvmAddress };
