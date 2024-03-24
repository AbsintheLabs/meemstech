import { fetchFName } from "@/app/utils/fetchFollowers";
import { fremesSupply, getBuyPrice } from "@/app/utils/readTransactions";
import { kv } from "@vercel/kv";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/frames",
  initialState: { pageIndex: 0, searchedUrls: [] as string[] }
});

const handleRequest = frames(async (ctx: any) => {
  const totalSupply = fremesSupply(
    ctx.searchParams.creatorAddress,
    ctx.searchParams.ticker
  );

  const currentPrice = getBuyPrice(
    ctx.searchParams.creatorAddress,
    ctx.searchParams.ticker
  );

  const fName = fetchFName(ctx.searchParams.creatorAddress) as any;

  const key =
    `${ctx.searchParams.creatorAddress}/${ctx.searchParams.ticker}`.toLowerCase();
  const url = kv.get(key);

  const values = await Promise.all([totalSupply, currentPrice, fName, url]);

  return {
    image: (
      <div tw='flex flex-col items-center bg-black w-full h-full text-white justify-center'>
        <div tw='flex text-6xl text-emerald-400'>
          Buy some ${ctx?.searchParams?.ticker?.toUpperCase()} here
        </div>
        <div tw='flex text-4xl mt-2'>Creator - @{values[2]?.profileName}</div>
        <div tw='flex text-4xl mt-2'>Current Supply - {Number(values[0])}</div>
        <div tw='flex text-4xl mt-2 mb-8'>
          Current Price - {Number(values[1]) / 10 ** 18} ETH
        </div>
        <img
          src={
            typeof values[3] === "string"
              ? values[3]
              : "https://i.pinimg.com/originals/a4/f8/76/a4f87654a7f881390312402d56c8a524.jpg"
          }
          alt='meme img'
          height={200}
          width={200}
        />
      </div>
    ),
    headers: {
      "Cache-Control": "max-age=5",
    },
    buttons: [
      <Button
        key='next'
        action='tx'
        target={{
          query: {
            creatorAddress: ctx.searchParams.creatorAddress,
            ticker: ctx.searchParams.ticker,
          },
          pathname: "/buy"
        }}
        post_url={`/meme?creatorAddress=${ctx.searchParams.creatorAddress}&ticker=${ctx.searchParams.ticker}`}
      >
        Buy
      </Button>,
      <Button
        key='next'
        action='tx'
        target={{
          query: {
            creatorAddress: ctx.searchParams.creatorAddress,
            ticker: ctx.searchParams.ticker
          },
          pathname: "/sell"
        }}
      >
        Sell
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          pathname: "/"
        }}
      >
        Make My Own
      </Button>,
      <Button
        key='next'
        action='post'
        target={`/meme?creatorAddress=${ctx.searchParams.creatorAddress}&ticker=${ctx.searchParams.ticker}`}
      >
        Points Coming Soon
      </Button>
    ],
    textInput: "Amount you wish to buy / sell"
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
