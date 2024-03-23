import { createFrames, Button } from "frames.js/next";
import googleImageSearch from "../../../utils/searchUtils";
import Image from "next/image";
import sharp from "sharp";
import fetch from "node-fetch";

const totalPages = 10;

export const frames = createFrames({
  basePath: "/frames/creator/imgcmp",
  initialState: {
    pageIndex: 0,
  },
});

const processImages = async (imageUrls: string[]) => {
  const images = await Promise.all(
    imageUrls.map(async (url) => {
      try {
        if (url.startsWith("data:")) return "data:image/png;base64,";
        const repsonse = await fetch(url);
        const buffer = await repsonse.arrayBuffer();
        const image = sharp(buffer);
        const { width, height } = await image.metadata();
        const safeWidth = Math.floor(width || 0);
        const safeHeight = Math.floor(height || 0);
        const squareSize = Math.min(safeWidth, safeHeight);
        const extractedImage = await image.extract({
          left: Math.floor((safeWidth - squareSize) / 2),
          top: Math.floor((safeHeight - squareSize) / 2),
          width: squareSize,
          height: squareSize,
        }).toBuffer();
        const resizedImage = await sharp(extractedImage).resize(150, 150).png().toBuffer();;

        return 'data:image/png;base64,' + resizedImage.toString("base64");
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return "https://s.yimg.com/ny/api/res/1.2/zpJgEgEIHJtNCmm6FTBxBg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/coindesk_75/76b14eac02234187ef0d5485201e978e";
      }
    })
  );
  return images;
};

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const searchedImageUrls = await googleImageSearch(ctx.message?.inputText + " meme");
  const processedImages = await processImages(searchedImageUrls);

  // TODO: add resizing

  return {
    image: (
      <div tw="flex">
        <img width={150} height={150} src={processedImages[0]} alt="Image" />
        <img width={150} height={150} src={processedImages[1]} alt="Image" />
        <div tw="flex">
          see ya later
        </div>
      </div>
    ),
    buttons: [
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        Pick Left
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        Pick Right
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        Give diff meme pics
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
          pathname: "/frames"
        }}
      >
        Go back
      </Button>,
    ],
    textInput: "search for funni meme 🔎",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

