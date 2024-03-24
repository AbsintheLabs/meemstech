import { createFrames, Button } from "frames.js/next";
import { kv } from "@vercel/kv";

// not ideal import paths for now
import { processImages } from "../../../utils/processImages";

const frames = createFrames({
  basePath: "/frames",
  initialState: {},
});

const handleRequest = frames(async (ctx) => {
  // TODO: create something that will autogenerate this
  const launchedLink = "https://meems.tech/@absinthe/WIF";

  // --------- OLD BELOW ------------
  // image url that will be displayed
  const selectedImageUrl = ctx.searchParams.selectedUrl || "";
  // when set to "name", it will make you pick the name. when set to "ticker", it will make you pick the ticker
  const nameSelector = ctx.searchParams.nameSelector || "name";
  // process images to make it square and compatible with frames
  const [processedImageUrl] = await processImages([selectedImageUrl]);
  const textPrompt =
    nameSelector === "name"
      ? "name of meme (ex: dogwifhat)"
      : "ticker of meme (ex: WIF)";
  console.log("selectedImageUrl", selectedImageUrl);

  // key = "creatorAddress/ticker/img" value=processedImageUrl
  // const key = `${ctx?.message?.castId.fid}/${NEED TO ADD THE TICKER HERE}/img`;
  // const saveImage = await kv.set(key, processedImageUrl);

  return {
    image: (
      // TODO: explain how the user can add handles here and for what
      <div tw="flex flex-col">
        <img width={220} height={220} src={processedImageUrl} alt="Image" />
        <div tw="flex">launched screen</div>
      </div>
    ),
    buttons: [
      <Button
        key="next"
        action="link"
        target={{
          query: {},
          href: launchedLink,
        }}
      >
        Repost the warp! 🚀
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
