import { buyShares } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  try {
    const json = await req.json();

    const { address } = json.untrustedData;

    const tx = await buyShares({
      address,
      amount: 1
    });

    return NextResponse.json(tx);
  } catch (error) {
    console.error(error);
    return NextResponse.json({});
  }
}
