import { createFrames, Button } from "frames.js/next";
import { getAddressForFid } from "frames.js";

const frames = createFrames({
  basePath: "/frames",
  initialState: {}
});

const handleRequest = frames(async (ctx) => {
  // TODO: create something that will autogenerate this
  let launchedLink = "";
  let ticker;
  try {
    const json = await ctx.request.json();
    const address = await getAddressForFid({ fid: json.untrustedData.fid });
    ticker = ctx.searchParams.ticker;
    launchedLink = `https://fremes.wtf/frames/meme?creatorAddress=${address}&ticker=${ticker}`;
  } catch (error) {
    console.error(error);
    console.error("failed to get address for fid");
  }

  return {
    image: (
      // TODO: explain how the user can add handles here and for what
      <div tw='flex flex-col w-full h-full items-center justify-center bg-black p-8 text-white'>
        <div tw='flex text-6xl text-center text-emerald-400'>{`$${ticker} is live!`}</div>
        <div tw='flex text-5xl text-center mt-6'>
          {" "}
          Build your lore, cast about your new freme!
        </div>
        <div tw='flex text-4xl text-center mt-6' >
          {" "}
          Don&apos;t worry if you get a 404 or blank page. Just copy the link anyway and repost it
        </div>
      </div>
    ),
    buttons: [
      <Button key='next' action='link' target={launchedLink}>
        Repost the warp! 🚀
      </Button>
    ]
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
