import { buyShares, createFreme } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  try {
    const json = await req.json();

    const { ticker, address1, address2 } = json.untrustedData;

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
