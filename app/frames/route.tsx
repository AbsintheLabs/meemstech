import { createFrames, Button } from "frames.js/next";
import { suggestMemes } from "../utils/recommendMemes";

const frames = createFrames({
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
  const suggestions = await suggestMemes();
  const imgCompareRoute = "/creator/imgcmp";

  return {
    image: (
      <div tw='flex flex-col h-screen w-full bg-slate-200'>
        <div tw='flex justify-center mt-16 text-8xl'>
          <div tw="flex text-blue-800 bg-yellow-400">fremes.wtf</div>
        </div>
        <div tw='flex justify-center mt-16 text-6xl'>
          <div tw="flex ">Create your own meme keys</div>
        </div>
        <div tw='flex justify-center mt-16 text-6xl'>
          <div tw="flex">
            Either
            <div>
              1. use the suggestions provided
            </div>
            <div>
              2. search for a meme from the textbox
            </div>
            <div>
              3. input a image url directly
            </div>
          </div>
        </div>
      </div>
    ),
    buttons: [
      <Button
        key='next'
        action='post'
        target={{
          query: { meme: suggestions[0] },
          pathname: imgCompareRoute,
        }}
      >
        {`&quot;${suggestions[0]}&quot; meme`}
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: { meme: suggestions[1] },
          pathname: imgCompareRoute,
        }}
      >
        {`&quot;${suggestions[1]}&quot; meme`}
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: {},
          pathname: '/'
        }}
      >
        Regenerate suggestions
      </Button>,
      <Button
        key='next'
        action='post'
        target={{
          query: {},
          pathname: imgCompareRoute
        }}
      >
        Search from textbox
      </Button>
    ],
    textInput: "google search or paste image url"
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
