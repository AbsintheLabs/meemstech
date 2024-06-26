import { buyShares } from "@/app/utils/writeTransactions";
import { TransactionTargetResponse } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { createFrames } from "frames.js/next";

async function buyHandler(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  try {
    const json = await req.json();

    const url = new URL(req.url);
    const creatorAddress = url.searchParams.get("creatorAddress");
    const ticker = url.searchParams.get("ticker");

    const { inputText: amount } = json.untrustedData;

    const tx = await buyShares({
      address: creatorAddress,
      ticker,
      amount
    });

    return NextResponse.json(tx as TransactionTargetResponse);
  } catch (error) {
    throw new Error("Invalid tx");
  }
}

const frames = createFrames({
  basePath: "/frames",
  initialState: {}
});

const handleRequest = frames(async () => {
  return {
    image: <div tw='flex flex-col'>Buy</div>
  };
});

export const GET = handleRequest;
export const POST = buyHandler;
