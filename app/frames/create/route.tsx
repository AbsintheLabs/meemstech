import { buyShares } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  try {
    const json = await req.json();

    const { address } = json.untrustedData;

    return NextResponse.json(
      buyShares({
        address,
        amount: 1
      })
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({});
  }
}
