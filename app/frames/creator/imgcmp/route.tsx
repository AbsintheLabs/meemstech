import { createFrames, Button } from "frames.js/next";
import googleImageSearch from "../../../utils/searchUtils";
import Image from "next/image";
import sharp from "sharp";
import fetch from "node-fetch";

const totalPages = 10;

export const frames = createFrames({
  basePath: "/frames",
  initialState: {
    carouselIndex: 0,
    memeInputMessage: "",
    searchedUrls: [] as string[],
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
        console.log("error is with this link:", url)

        {/* return "https://s.yimg.com/ny/api/res/1.2/zpJgEgEIHJtNCmm6FTBxBg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/coindesk_75/76b14eac02234187ef0d5485201e978e"; */ }
      }
    })
  );
  return images;
};


async function filterImageUrls(imageUrls: string[]): Promise<string[]> {
  const supportedTypes = ['image/png', 'image/jpeg'];

  const checkImageType = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get('Content-Type');
      return supportedTypes.includes(contentType ?? '');
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return false;
    }
  };

  const results = await Promise.all(
    imageUrls.map(async (url) => {
      const isValid = await checkImageType(url);
      return isValid ? url : null;
    })
  );

  return results.filter((url): url is string => url !== null);
}



const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const carouselIndex = Number(ctx.searchParams.carouselIndex || 0);

  console.log("carouselIndex", carouselIndex)
  console.log("carouselindex from context", ctx.searchParams.carouselIndex)
  console.log("state", ctx.state)

  if (!ctx.searchParams.carouselIndex) {
    ctx.state.searchedUrls = [];
  }

  let allSearchedImageUrls = [];
  let filteredImageUrls = [];
  console.log("ctx.params", ctx.searchParams.urls)
  if (ctx.state.searchedUrls.length === 0) {
    console.log("message", ctx.message?.inputText)
    allSearchedImageUrls = await googleImageSearch(ctx.message?.inputText + " meme");
    allSearchedImageUrls = await filterImageUrls(allSearchedImageUrls);
    // necessary processing step
    ctx.state.searchedUrls = allSearchedImageUrls;
    {/* console.log("filteredImageUrls", filteredImageUrls) */ }
  } else {
    allSearchedImageUrls = ctx.state.searchedUrls;
    console.log("allSearchedImageUrlsFROMCONTEXT", allSearchedImageUrls)
  }

  const lowerBound = carouselIndex;
  const upperBound = (carouselIndex + 1) % allSearchedImageUrls.length;
  console.log("lowerBound", lowerBound)
  console.log("upperBound", upperBound)
  const searchedImageUrls = [allSearchedImageUrls[lowerBound], allSearchedImageUrls[upperBound]];
  console.log("searchedImageUrls", searchedImageUrls)

  const processedImages = await processImages(searchedImageUrls);


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
          query: { carouselIndex: ((carouselIndex + 1) % allSearchedImageUrls.length) },
          pathname: "/creator/imgcmp",
        }}
      >
        Give diff meme pics
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
          pathname: "/"
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

