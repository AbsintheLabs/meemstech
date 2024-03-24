import { memecoinAbi } from "../abi/memecoinAbi";
import { publicClient } from "./publicClient";

// const CONTRACT_ADDRESS = "0x331Fe061948E52CD96cF49E0a2fEBc4cd22a5F62";
const CONTRACT_ADDRESS = "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4";

export const getBuyPrice = async (subjectAddress: string) => {
  try {
    const response = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: memecoinAbi,
      functionName: "getBuyPrice",
      args: [subjectAddress, 1]
    });

    return response;
  } catch (error) {
    return 0;
  }
};

export const getBuyPriceAfterFee = async (
  subjectAddress: string,
  amt: string
) => {
  try {
    const response = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: memecoinAbi,
      functionName: "getBuyPriceAfterFee",
      args: [subjectAddress, Number(amt)]
    });

    return response;
  } catch (error) {
    return 0;
  }
};

export const getSellPriceAfterFee = async (
  subjectAddress: string,
  amt: string
) => {
  try {
    const response = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: memecoinAbi,
      functionName: "getSellPriceAfterFee",
      args: [subjectAddress, amt]
    });

    return response;
  } catch (error) {
    return 0;
  }
};
