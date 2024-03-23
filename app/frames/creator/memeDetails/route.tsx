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
  // only move on to the next route if the user has entered a ticker
  const nextPathname = nameSelector === "name" ? "/creator/memeDetails" : "/creator/revshareSelector";

  return {
    image: (
      <div tw="flex flex-col">
        <img width={220} height={220} src={processedImageUrl} alt="Image" />
        {nameSelector === "name" ? (
          <div tw="flex">
            in memeDetails route. select name of meme
          </div>
        ) : (
          <div tw="flex">
            in memeDetails route. select ticker of meme
          </div>
        )}
      </div>
    ),
    buttons: [
      // FIXME: MASSIVE ITEM, SAVE THE NAME AND TICKER TO THE DATABASE
      <Button
        key="next"
        action="post"
        target={{
          query: { selectedUrl: selectedImageUrl, nameSelector: "ticker" },
          pathname: nextPathname,
        }}
      >
        next
      </Button>,
    ],
    textInput: textPrompt,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

