const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");

csv()
  .fromFile(path.join(__dirname, "./csv/country_full.csv"))
  .then((json) => {
    console.log(json);
  });

const readStream = fs.createReadStream(path.join(__dirname, "./csv/country_full.csv"));
const writeStream = fs.createWriteStream(path.join(__dirname, "./txt/country_full.txt"));
readStream.pipe(csv()).pipe(writeStream);
