import { createFrames, Button } from "frames.js/next";

// not ideal import paths for now
import { processImages } from "../../../utils/processImages";

const frames = createFrames({
  basePath: "/frames",
  initialState: {}
});

const handleRequest = frames(async (ctx) => {
  // TODO: create something that will autogenerate this
  const json = await ctx.request.json();
  const address = json.untrustedData.address;
  const ticker = ctx.searchParams.ticker;
  const launchedLink = `https://fremes.wtf/meme/creatorAddress=${address}&ticker=${ticker}`

  return {
    image: (
      // TODO: explain how the user can add handles here and for what
      <div tw='flex flex-col'>
        {/* <img width={220} height={220} src={} alt='Image' /> */}
        <div tw='flex'>launched screen</div>
        <div tw='flex'>click on the link. copy the url in the url bar. and paste it into a new warp!</div>
      </div>
    ),
    buttons: [
      <Button
        key='next'
        action='link'
        target={launchedLink}
      >
        Repost the warp! 🚀
      </Button>
    ]
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
