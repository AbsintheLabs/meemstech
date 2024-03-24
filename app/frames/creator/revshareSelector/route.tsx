import { createFrames, Button } from "frames.js/next";

// not ideal import paths for now
import { processImages } from "../../../utils/processImages";

const frames = createFrames({
  basePath: "/frames",
  initialState: {}
});

const handleRequest = frames(async (ctx) => {
  // image url that will be displayed
  const selectedImageUrl = ctx.searchParams.selectedUrl || "";
  // when set to "name", it will make you pick the name. when set to "ticker", it will make you pick the ticker
  const nameSelector = ctx.searchParams.nameSelector || "name";
  // process images to make it square and compatible with frames
  const [processedImageUrl] = await processImages([selectedImageUrl]);
  console.log("---", ctx.searchParams)
  console.log("selectedImageUrl", selectedImageUrl);
  const stateObj = {
    selectedUrl: ctx.searchParams.selectedUrl,
    name: ctx.searchParams.name,
    // default to the query param unless it exists from the prev frame input text
    ticker: ctx.searchParams.ticker || ctx.message?.inputText,
    benefactors: (ctx.searchParams.benefactors || []) as string[]
  }

  // add the inputText to the benefactors array if it's not the first time
  if (ctx.searchParams.notFirstTime) {
    stateObj.benefactors.push(ctx.message?.inputText || "")
  }


  console.log("$$$", stateObj)

  return {
    image: (
      // TODO: explain how the user can add handles here and for what
      <div tw='flex flex-col'>
        <img width={220} height={220} src={processedImageUrl} alt='Image' />
        <div tw='flex'>revshare selector screen</div>
      </div>
    ),
    buttons: [
      <Button
        key='next'
        action='post'
        target={{
          query: { ...stateObj, notFirstTime: true },
          pathname: "/creator/revshareSelector"
        }}
      >
        Add Handle
      </Button>,
      <Button
        key='next'
        action='tx'
        target={{
          query: {},
          pathname: "/create"
        }}
      >
        Launch Meme
      </Button>
    ],
    textInput: "add handle here (ex: @absinthe)"
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
