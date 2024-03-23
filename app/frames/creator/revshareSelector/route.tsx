import { createFrames, Button } from "frames.js/next";

// not ideal import paths for now
import { processImages } from "../../../utils/processImages";

const frames = createFrames({
  basePath: "/frames",
  initialState: {
  },
});

const handleRequest = frames(async (ctx) => {
  // image url that will be displayed
  const selectedImageUrl = ctx.searchParams.selectedUrl || "";
  // when set to "name", it will make you pick the name. when set to "ticker", it will make you pick the ticker
  const nameSelector = ctx.searchParams.nameSelector || "name";
  // process images to make it square and compatible with frames
  const [processedImageUrl] = await processImages([selectedImageUrl]);
  const textPrompt = nameSelector === "name" ? "name of meme (ex: dogwifhat)" : "ticker of meme (ex: WIF)";
  console.log("selectedImageUrl", selectedImageUrl)

  return {
    image: (
      // TODO: explain how the user can add handles here and for what
      <div tw="flex flex-col">
        <img width={220} height={220} src={processedImageUrl} alt="Image" />
        <div tw="flex">
          revshare selector screen
        </div>
      </div>
    ),
    buttons: [
      <Button
        key="next"
        action="post"
        target={{
          query: {},
          pathname: "/creator/revshareSelector",
        }}
      >
        Add Handle
      </Button >,
      <Button
        key="next"
        action="post"
        target={{
          query: {},
          pathname: "/creator/revshareSelector",
        }}
      >
        Launch Meme
      </Button >,

    ],
    textInput: 'add handle here (ex: @absinthe)',
  };
});

export const GET = handleRequest;
export const POST = handleRequest;


