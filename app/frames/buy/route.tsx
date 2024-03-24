import { buyShares } from "@/app/utils/writeTransactions";
import { TransactionTargetResponse } from "frames.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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
