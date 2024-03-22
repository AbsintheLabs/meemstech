import { createFrames, Button } from "frames.js/next";

const totalPages = 10;

export const frames = createFrames({
  basePath: "/frames/creator/imgcmp",
  initialState: {
    pageIndex: 0,
  },
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);

  return {
    image: (
      <div tw="flex flex-col">
        {/* <img width={300} height={200} src={imageUrl} alt="Image" /> */}
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
        a
      </Button>,
      <Button
        key="next"
        action="post"
        target={{
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        b
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
          query: { pageIndex: (pageIndex - 1) % totalPages },
        }}
      >
        Search from textbox
      </Button>,
    ],
    textInput: "search for funni meme 🔎",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;

