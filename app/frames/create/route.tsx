import { buyShares, createFreme } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  try {
    // const json = await req.json();

    const url = new URL(req.url);
    const ticker = url.searchParams.get("ticker");
    const benefactors = url.searchParams.get("benefactors")?.split(",") ?? [];

    console.log(ticker, benefactors);

    const tx = await createFreme({
      ticker,
      address1:
        benefactors?.length > 0 && benefactors[0] !== ""
          ? benefactors[0]
          : "0x0000000000000000000000000000000000000000",
      address2:
        benefactors?.length > 1 && benefactors[1] !== ""
          ? benefactors[1]
          : "0x0000000000000000000000000000000000000000"
    });

    return NextResponse.json(tx);
  } catch (error) {
    console.error(error);
    return NextResponse.json({});
  }
}
