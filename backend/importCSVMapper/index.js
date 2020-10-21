require("../db/connection");
//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const csvtojson = require("csvtojson");
const CompanyDataSchema = require("../models/company.schema");

console.log(__dirname);
//joining path of directory
const etfsDirectoryPath = path.join(__dirname, "etfs");
//passsing etfsDirectoryPath and callback function
fs.readdir(etfsDirectoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(async function (file) {
    const filePath = path.join(__dirname, `etfs/${file}`);
    csvtojson()
      .fromFile(filePath)
      .then(async (csvData) => {
        const companyData = new CompanyDataSchema({
          symbol: file.slice(0, -4),
          stocksData: csvData,
        });
        companyData.save((res) => {
          console.log("saved" + file, res);
        });
      });
  });
});
