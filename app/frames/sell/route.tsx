import { sellShares } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  try {
    const json = await req.json();

    const subjectAddress =
      req.url.split("?")[1].split("&")[0].split("=")[1] ?? "";

    const { inputText: amount } = json.untrustedData;

    return NextResponse.json(
      sellShares({
        address: subjectAddress,
        amount
      })
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({});
  }
}