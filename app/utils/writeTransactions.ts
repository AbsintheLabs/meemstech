import { memecoinAbi } from "../abi/memecoinAbi";
import { encodeFunctionData } from "viem";
import { getBuyPriceAfterFee, getSellPriceAfterFee } from "./readTransactions";
import { MEME_CONTRACT_ADDRESS } from "./constants";

export const createFreme = async (data: any) => {
  try {
    const { ticker, address1, address2 } = data;

    const encodedData = encodeFunctionData({
      abi: memecoinAbi,
      functionName: "createFreme",
      args: [
        ticker,
        address1 ?? "0x0000000000000000000000000000000000000000",
        address2 ?? "0x0000000000000000000000000000000000000000"
      ]
    });

    return {
      chainId: "eip155:8453",
      method: "eth_sendTransaction",
      params: {
        abi: memecoinAbi,
        to: MEME_CONTRACT_ADDRESS,
        data: encodedData,
        value: 0
      }
    };
  } catch (error) {
    console.error(error);
  }
};

export const buyShares = async (data: any) => {
  try {
    const { amount, ticker, address } = data;

    const buyPrice = await getBuyPriceAfterFee(address, ticker, amount);

    const encodedData = encodeFunctionData({
      abi: memecoinAbi,

      functionName: "buyFremes",
      args: [address, ticker, amount]
    });

    return {
      chainId: "eip155:8453",
      method: "eth_sendTransaction",
      params: {
        abi: memecoinAbi,
        to: MEME_CONTRACT_ADDRESS,
        data: encodedData,

        value: Number(buyPrice).toString()
      }
    };
  } catch (error) {
    console.error(error);
  }
};

export const sellShares = async (data: any) => {
  try {
    const { amount, ticker, address } = data;

    const sellPrice = await getSellPriceAfterFee(address, ticker, amount);

    const encodedData = encodeFunctionData({
      abi: memecoinAbi,

      functionName: "sellFremes",
      args: [address, ticker, amount]
    });

    return {
      chainId: "eip155:8453",
      method: "eth_sendTransaction",
      params: {
        abi: memecoinAbi,

        to: MEME_CONTRACT_ADDRESS,
        data: encodedData,
        value: Number(sellPrice).toString()
      }
    };
  } catch (error) {
    console.error(error);
  }
};
