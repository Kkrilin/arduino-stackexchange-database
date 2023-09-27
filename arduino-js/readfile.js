const fs = require("fs");

const xml2js = require("xml2js");
const util = require("util");

const parser = new xml2js.Parser();

function readFile(path, key) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${path}`, "utf-8", (err, data) => {
      parser.parseString(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          util.inspect(result, false, null);
          resolve(result[key].row);
        }
      });
    });
  });
}

module.exports = readFile;
