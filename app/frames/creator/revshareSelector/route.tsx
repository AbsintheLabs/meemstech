import { createFrames, Button } from "frames.js/next";

// not ideal import paths for now
import { processImages } from "../../../utils/processImages";
import { fetchEvmAddress } from "../../../utils/fetchFollowers";

const frames = createFrames({
  basePath: "/frames",
  initialState: {}
});

const handleRequest = frames(async (ctx: any) => {
  // image url that will be displayed
  const selectedImageUrl = ctx.searchParams.selectedUrl || "";
  // when set to "name", it will make you pick the name. when set to "ticker", it will make you pick the ticker
  const nameSelector = ctx.searchParams.nameSelector || "name";
  // process images to make it square and compatible with frames
  const [processedImageUrl] = await processImages([selectedImageUrl]);
  const stateObj = {
    selectedUrl: ctx.searchParams.selectedUrl,
    name: ctx.searchParams.name,
    // default to the query param unless it exists from the prev frame input text
    ticker: ctx.searchParams.ticker || ctx.message?.inputText,
    benefactors: (ctx.searchParams.benefactors || "") as string
  };

  // capitalize ticker
  stateObj.ticker = (stateObj.ticker || "").toUpperCase();

  // given warpcast handle, get eoa address

  // add the inputText to the benefactors array if it's not the first time
  if (ctx.searchParams.notFirstTime) {
    // get eoa address
    try {
      const address = await fetchEvmAddress(ctx.message?.inputText);
      stateObj.benefactors = stateObj.benefactors.concat(
        address.userAddress + ","
      );
    } catch (error) {
      console.error(error);
    }
  }

  return {
    image: (
      // TODO: explain how the user can add handles here and for what
      <div tw='flex flex-col w-full h-full bg-black items-center justify-center text-white p-4'>
        <img width={220} height={220} src={processedImageUrl} alt='Image' />
        <div tw='flex text-5xl mt-6 text-center items-center justify-center'>
          You can select upto 2 frens to get revshare. They just have to buy
          your Freme! (You can add them later also) Ready? Launch!
        </div>
        <div tw='flex text-3xl mt-4 p-4'>
          Benefactors - {stateObj.benefactors.split(",").length - 1}
        </div>
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
          query: {
            ticker: stateObj.ticker,
            benefactors: stateObj.benefactors,
            selectedUrl: stateObj.selectedUrl
          },
          pathname: "/create"
        }}
        post_url={`/creator/launched?ticker=${stateObj.ticker}`}
      >
        Launch Meme
      </Button>
    ],
    textInput: "add handle here (vitalik.eth)"
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
