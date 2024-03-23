import { memecoinAbi } from "../abi/memecoinAbi";
import { publicClient } from "./publicClient";

const CONTRACT_ADDRESS = "0x331Fe061948E52CD96cF49E0a2fEBc4cd22a5F62";

export const getBuyPriceAfterFee = async (
  subjectAddress: string,
  amt: string
) => {
  const response = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: memecoinAbi,
    functionName: "getBuyPriceAfterFee",
    args: [subjectAddress, amt]
  });

  return response;
};

export const getSellPriceAfterFee = async (
  subjectAddress: string,
  amt: string
) => {
  const response = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: memecoinAbi,
    functionName: "getSellPriceAfterFee",
    args: [subjectAddress, amt]
  });

  return response;
};
