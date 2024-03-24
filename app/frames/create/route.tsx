import { createFreme } from "@/app/utils/writeTransactions";
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { processImages } from "../../utils/processImages";
import { createFrames } from "frames.js/next";
import { TransactionTargetResponse } from "frames.js";

async function launch(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  try {
    const json = await req.json();

    const url = new URL(req.url);
    const ticker = url.searchParams.get("ticker");
    const selectedUrl = url.searchParams.get("selectedUrl") ?? "";
    const benefactors = url.searchParams.get("benefactors")?.split(",") ?? [];

    const [b64img] = await processImages([selectedUrl]);

    const key = `${json.untrustedData.address}/${ticker}`;
    await kv.set(key, b64img);

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

    return NextResponse.json(tx as TransactionTargetResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({} as TransactionTargetResponse);
  }
}

const frames = createFrames({
  basePath: "/frames",
  initialState: {}
});

const handleRequest = frames(async () => {
  return {
    image: <div tw='flex flex-col'>Launch Meme</div>
  };
});

export const GET = handleRequest;
export const POST = launch;
