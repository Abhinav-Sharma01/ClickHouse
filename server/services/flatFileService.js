const fs = require('fs');
const { Parser } = require('json2csv');
const csv = require('csv-parser');

async function writeToCSV(data, fileName) {
  const parser = new Parser();
  const csvData = parser.parse(data);
  fs.writeFileSync(fileName, csvData);
}

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

module.exports = { writeToCSV, parseCSV };