import { createFrames, Button } from "frames.js/next";

const totalPages = 10;

export const frames = createFrames({
  basePath: "/frames",
  initialState: {
    pageIndex: 0,
  },
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);

  const imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;
  const suggestions = ["Bogdanoff", "Elon Musk"];
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
      <Button action="tx" target="/txdata" post_url="/tx-success">
        Buy storage
      </Button>,
    ],
    textInput: "search for funni meme 🔎",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
