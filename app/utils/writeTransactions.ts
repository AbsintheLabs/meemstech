import { memecoinAbi } from "../abi/memecoinAbi";
import { encodeFunctionData, parseEther } from "viem";
import { getBuyPriceAfterFee, getSellPriceAfterFee } from "./readTransactions";

const CONTRACT_ADDRESS = "0x331Fe061948E52CD96cF49E0a2fEBc4cd22a5F62";

export const buyShares = async (data: any) => {
  const { amount, address } = data;

  const buyPrice = await getBuyPriceAfterFee(address, amount);

  const encodedData = encodeFunctionData({
    abi: memecoinAbi,
    functionName: "buyShares",
    args: [address, amount]
  });

  return {
    chainId: "eip155:8453",
    method: "eth_sendTransaction",
    params: {
      abi: memecoinAbi,
      to: CONTRACT_ADDRESS,
      data: encodedData,
      value: parseEther(buyPrice as string)
    }
  };
};

export const sellShares = async (data: any) => {
  const { amount, address } = data;

  const sellPrice = await getSellPriceAfterFee(address, amount);

  const encodedData = encodeFunctionData({
    abi: memecoinAbi,
    functionName: "sellShares",
    args: [address, amount]
  });

  return {
    chainId: "eip155:8453",
    method: "eth_sendTransaction",
    params: {
      abi: memecoinAbi,
      to: CONTRACT_ADDRESS,
      data: encodedData
    },
    value: parseEther(sellPrice as string)
  };
};
