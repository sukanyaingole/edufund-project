const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companyDataSchema = new Schema({
  symbol: String,
  CQSSymbol: String,
  NASDAQSymbol: String,
  stocksData: [
    {
      Date: String,
      Open: String,
      High: String,
      Low: String,
      Close: String,
      AdjClose: String,
      Volume: String,
    },
  ],
});

const companyData = mongoose.model("companyData", companyDataSchema);
module.exports = companyData;
