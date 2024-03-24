// import { parse } from "csv-parse/sync";
// import { promises as fs } from "fs";

const fs = require("fs").promises;

const path1 = "public/meme_phrases.csv";
const path2 = "public/public_figures.csv";

async function getRandomEntryFromCSV(filePath: string) {
  const fileContent = await fs.readFile(filePath, { encoding: "utf8" });

  if (!fileContent) {
    console.log(`No content read from file: ${filePath}`);
    return null;
  }

  const records = fileContent.split(",").map((item: any) => item.trim());

  if (records.length === 0) {
    console.log(`No records found in file: ${filePath}`);
    return null;
  }

  const randomIndex = Math.floor(Math.random() * records.length);
  return records[randomIndex];
}

export async function suggestMemes() {
  const path1 = "meme_phrases.csv";
  const path2 = "public_figures.csv";
  const entry1 = await getRandomEntryFromCSV(path1);
  const entry2 = await getRandomEntryFromCSV(path2);

  return [entry1, entry2];
}

// suggestMemes(path1, path2).catch(console.error);
// export default suggestMemes;
