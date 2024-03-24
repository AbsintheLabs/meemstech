import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/frames",
  initialState: { pageIndex: 0, searchedUrls: [] as string[] }
});

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw='flex flex-col'>
        <div tw='flex'>Main Page</div>
      </div>
    ),
    buttons: [
      <Button
        key='next'
        action='tx'
        target={{
          query: {
            creatorAddress: ctx.searchParams.creatorAddress,
            ticker: ctx.searchParams.ticker
          },
          pathname: "/buy"
        }}
      >
        Buy
      </Button>,
      <Button
        key='next'
        action='tx'
        target={{
          query: {
            creatorAddress: ctx.searchParams.creatorAddress,
            ticker: ctx.searchParams.ticker
          },
          pathname: "/sell"
        }}
      >
        Sell
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          pathname: "/frames"
        }}
      >
        Make My Own Meme
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: {},
          pathname: "/memeboard"
        }}
      >
        MEME BOARD
      </Button>
    ],
    textInput: "Amount you wish to buy / sell"
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
