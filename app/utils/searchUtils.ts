// import * as dotenv from "dotenv";
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;

console.log("able to get api keys")

// Define a type for the expected response to ensure type-safety.
type GoogleImageSearchResponse = {
  items: Array<{
    link: string;
  }>;
};

export default async function googleImageSearch(query: string, upToNumber: number = 0): Promise<string[]> {
  if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
    throw new Error("Google API key or Custom Search Engine ID is not set");
  }

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&cx=${GOOGLE_CSE_ID}&searchType=image&key=${GOOGLE_API_KEY}&num=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = (await response.json()) as GoogleImageSearchResponse;
    const imageUrls = data.items.map((item) => item.link);
    return imageUrls;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}

// Usage example (comment this out in production code):
// googleImageSearch("bogdanoff twins pump it")
//   .then((images) => {
//     console.log(images);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
