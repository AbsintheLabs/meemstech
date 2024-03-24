import { buyShares, createFreme } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  try {
    const json = await req.json();

    const { ticker, address1, address2 } = json.untrustedData;

    const key = `${address}/${ticker}`;
    await kv.set(key, processedImageUrl);

    const tx = await createFreme({
      ticker,
      address1,
      address2
    });

    return NextResponse.json(tx);
  } catch (error) {
    console.error(error);
    return NextResponse.json({});
  }
}
