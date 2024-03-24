import { memecoinAbi } from "../abi/memecoinAbi";
import { encodeFunctionData } from "viem";
import { getBuyPriceAfterFee, getSellPriceAfterFee } from "./readTransactions";

const CONTRACT_ADDRESS = "0x331Fe061948E52CD96cF49E0a2fEBc4cd22a5F62";

export const buyShares = async (data: any) => {
  try {
    const { amount, address } = data;

    const buyPrice = await getBuyPriceAfterFee(address, amount);
    // console.log("BUY PRICE", buyPrice)
    // const buyPrice = BigInt(62500000000000);

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
        value: Number(buyPrice)
      }
    };
  } catch (error) {
    console.error(error);
  }
};

export const sellShares = async (data: any) => {
  try {
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
      value: Number(sellPrice)
    };
  } catch (error) {
    console.error(error);
  }
};
