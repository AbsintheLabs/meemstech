import { getFrameMessage } from "frames.js";
import { createFrames, Button } from "frames.js/next";

const totalPages = 10;

export const frames = createFrames({
  basePath: "/frames",
  initialState: {
    pageIndex: 0,
    searchedUrls: [] as string[]
  }
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  ctx.state.searchedUrls = [];

  console.log(ctx.state);
  const imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;
  const suggestions = ["Bogdanoff", "Elon Musk"];
  const imgCompareRoute = "/creator/imgcmp";
  const buyTxRoute = "/buy";

  return {
    image: (
      <div tw='flex flex-col'>
        {/* <img width={300} height={200} src={imageUrl} alt="Image" /> */}
        <div tw='flex'>hello world</div>
      </div>
    ),
    buttons: [
      <Button
        key='next'
        action='post'
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
          pathname: imgCompareRoute
        }}
      >
        {`&quot;${suggestions[0]}&quot; meme`}
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages }
        }}
      >
        {`&quot;${suggestions[1]}&quot; meme`}
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages }
        }}
      >
        Regenerate suggestions
      </Button>,
      <Button
        key='next'
        action='tx'
        target={{
          query: { address: "0x5aC09Ca0865B5492a82460acb43ce658Ea6163D2" },
          pathname: buyTxRoute
        }}
      >
        Buy Shares
      </Button>
      // <Button
      //   key='next'
      //   action='post'
      //   target={{
      //     query: {},
      //     pathname: imgCompareRoute
      //   }}
      // >
      //   Search from textbox
      // </Button>
    ],
    textInput: "amount to buy"
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
