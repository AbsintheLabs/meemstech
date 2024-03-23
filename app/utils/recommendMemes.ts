// import { parse } from "csv-parse/sync";
// import { promises as fs } from "fs";

const fs = require("fs").promises;

const path1 = "public/meme_phrases.csv";
const path2 = "public/public_figures.csv";

async function getRandomEntryFromCSV(filePath: string) {
  //   console.log(`Reading file: ${filePath}`);
  const fileContent = await fs.readFile(filePath, { encoding: "utf8" });

  if (!fileContent) {
    console.log(`No content read from file: ${filePath}`);
    return null;
  }

  //   console.log(`File content from ${filePath}: ${fileContent}`);
  const records = fileContent.split(",").map((item: any) => item.trim());

  if (records.length === 0) {
    console.log(`No records found in file: ${filePath}`);
    return null;
  }

  //   console.log(`Total records found: ${records.length}`);
  const randomIndex = Math.floor(Math.random() * records.length);
  return records[randomIndex];
}

async function suggestMemes(csvFilePath1: string, csvFilePath2: string) {
  const entry1 = await getRandomEntryFromCSV(csvFilePath1);
  const entry2 = await getRandomEntryFromCSV(csvFilePath2);

  //   console.log("Random entry from first CSV:", entry1);
  //   console.log("Random entry from second CSV:", entry2);

  return [entry1, entry2];
}

// suggestMemes(path1, path2).catch(console.error);
