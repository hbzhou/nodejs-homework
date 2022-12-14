import csv from "csvtojson";
import path from "path";
import fs from "fs";

csv()
  .fromFile(path.join(__dirname, "../public/country_full.csv"))
  .then((json) => {
    console.log(json);
  });

const readStream = fs.createReadStream(path.join(__dirname, "../public/country_full.csv"));
const writeStream = fs.createWriteStream(path.join(__dirname, "../public/country_full.txt"));
readStream.pipe(csv()).pipe(writeStream);
