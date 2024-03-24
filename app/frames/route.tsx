import { createFrames, Button } from "frames.js/next";
import { suggestMemes } from "../utils/recommendMemes";

const totalPages = 10;
const path1 = "public/meme_phrases.csv";
const path2 = "public/public_figures.csv";

const frames = createFrames({
  basePath: "/frames",
  initialState: {
    pageIndex: 0,
    searchedUrls: [] as string[],
  },
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  ctx.state.searchedUrls = [];

  console.log(ctx.state);
  const imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;
  const suggestions = await suggestMemes();
  console.log("suggestions are", suggestions);
  const imgCompareRoute = "/creator/imgcmp";

  return {
    image: (
      <div tw="flex flex-col">
        {/* <img width={300} height={200} src={imageUrl} alt="Image" /> */}
        <div tw="flex">hello world</div>
      </div>
    ),
    buttons: [
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
          pathname: imgCompareRoute,
        }}
      >
        {`&quot;${suggestions[0]}&quot; meme`}
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        {`&quot;${suggestions[1]}&quot; meme`}
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        Regenerate suggestions
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: {},
          pathname: imgCompareRoute,
        }}
      >
        Search from textbox
      </Button>,
    ],
    textInput: "search with text input",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
