import { createFrames, Button } from "frames.js/next";
import googleImageSearch from "../../../utils/searchUtils";
import Image from "next/image";
import { processImages } from "../../../utils/processImages";
import fetch from "node-fetch";

const frames = createFrames({
  basePath: "/frames",
  initialState: {
    carouselIndex: 0,
    memeInputMessage: "",
    searchedUrls: [] as string[]
  }
});

async function filterImageUrls(imageUrls: string[]): Promise<string[]> {
  const supportedTypes = ["image/png", "image/jpeg"];

  const checkImageType = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get("Content-Type");
      return supportedTypes.includes(contentType ?? "");
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

  if (!ctx.searchParams.carouselIndex) {
    ctx.state.searchedUrls = [];
  }

  let allSearchedImageUrls = [];
  let filteredImageUrls = [];
  if (ctx.state.searchedUrls.length === 0) {
    const memeMessage: string =
      ctx.message?.inputText || ctx.searchParams?.meme || "";
    if (memeMessage.startsWith("http")) {
      allSearchedImageUrls = [memeMessage];
    } else {
      allSearchedImageUrls = await googleImageSearch(memeMessage);
      allSearchedImageUrls = await filterImageUrls(allSearchedImageUrls);
    }
    // necessary processing step
    ctx.state.searchedUrls = allSearchedImageUrls;
    {
    }
  } else {
    allSearchedImageUrls = ctx.state.searchedUrls;
  }

  const lowerBound = carouselIndex;
  const upperBound = (carouselIndex + 1) % allSearchedImageUrls.length;

  const searchedImageUrls = [
    allSearchedImageUrls[lowerBound],
    allSearchedImageUrls[upperBound]
  ];

  const processedImages = await processImages(searchedImageUrls);

  return {
    image: (
      <div tw='flex flex-col justify-center items-center text-white w-full h-full bg-black'>
        <div tw='flex'>
          <img width={200} height={200} src={processedImages[0]} alt='Image' />
          <img width={200} height={200} src={processedImages[1]} alt='Image' />
        </div>
      </div>
    ),
    buttons: [
      // we can pass the image link to the next route and preprocess it there again too
      <Button
        key='next'
        action='post'
        target={{
          query: { selectedUrl: searchedImageUrls[0], nameSelector: "name" },
          pathname: "/creator/memeDetails"
        }}
      >
        Pick Left
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: { selectedUrl: searchedImageUrls[1], nameSelector: "name" },
          pathname: "/creator/memeDetails"
        }}
      >
        Pick Right
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: {
            carouselIndex: (carouselIndex + 1) % allSearchedImageUrls.length
          },
          pathname: "/creator/imgcmp"
        }}
      >
        Show Another
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: {},
          pathname: "/"
        }}
      >
        Go back⬅
      </Button>
    ]
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
