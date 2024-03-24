import { memecoinAbi } from "../abi/memecoinAbi";
import { MEME_CONTRACT_ADDRESS } from "./constants";
import { publicClient } from "./publicClient";

export const getBuyPrice = async (subjectAddress: string) => {
  try {
    const response = await publicClient.readContract({
      address: MEME_CONTRACT_ADDRESS,
      abi: memecoinAbi,
      functionName: "getBuyPrice",
      args: [subjectAddress, "WOFF", 1]
    });

    return response;
  } catch (error) {
    return 0;
  }
};

export const getBuyPriceAfterFee = async (
  subjectAddress: string,
  ticker: string,
  amt: string
) => {
  try {
    const response = await publicClient.readContract({
      address: MEME_CONTRACT_ADDRESS,
      abi: memecoinAbi,
      functionName: "getBuyPriceAfterFee",
      args: [subjectAddress, ticker, Number(amt)]
    });

    return response;
  } catch (error) {
    return 0;
  }
};

export const getSellPriceAfterFee = async (
  subjectAddress: string,
  ticker: string,
  amt: string
) => {
  try {
    const response = await publicClient.readContract({
      address: MEME_CONTRACT_ADDRESS,
      abi: memecoinAbi,
      functionName: "getSellPriceAfterFee",
      args: [subjectAddress, ticker, amt]
    });

    return response;
  } catch (error) {
    return 0;
  }
};
