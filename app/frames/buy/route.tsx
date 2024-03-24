import { buyShares } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<any>> {
  try {
    const json = await req.json();

    const subjectAddress =
      req.url.split("?")[1].split("&")[0].split("=")[1] ?? "0x5aC09Ca0865B5492a82460acb43ce658Ea6163D2";
    {/* const subjectAddress = "0x5aC09Ca0865B5492a82460acb43ce658Ea6163D2" */ }
    console.log("subjectAddress", subjectAddress)
    console.log(json)

    const { inputText: amount } = json.untrustedData;

    const tx = await buyShares({
      address: subjectAddress,
      amount
    });

    console.log("tx:", tx)

    return NextResponse.json(tx);
  } catch (error) {
    console.error(error);
    return NextResponse.json({});
  }
}
