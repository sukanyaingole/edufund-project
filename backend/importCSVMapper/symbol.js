require("../db/connection");
//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const csvtojson = require("csvtojson");
const SymbolValidMetaDataSchema = require("../models/symbolValidMetaData.schema");
const Company = require("../models/company.schema");

console.log(__dirname);
//joining path of directory
const symbolDirectoryPath = path.join(__dirname, "symbol");

//passsing symbolDirectoryPath and callback function
fs.readdir(symbolDirectoryPath, function (err, file) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  const filePath = path.join(__dirname, `symbol/${file}`);
  csvtojson()
    .fromFile(filePath)
    .then((csvData) => {
      Company.find({}, { _id: 0, symbol: 1 }, async (e, companyData) => {
        if (e) {
          console.log(e);
        }
        var symbols = [];
        companyData.forEach((s) => {
          symbols.push(s.symbol);
        });
        csvData.forEach((data) => {
          if (symbols.includes(data.Symbol)) {
            const symbolData = new SymbolValidMetaDataSchema(data);
            symbolData.save((res) => {
              console.log("Saved!", file, res);
            });
          }
        });
      });
    });
});
