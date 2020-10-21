const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symbolValidMetaDataSchema = new Schema({
  Symbol: String,
  SecurityName: String,
  NasdaqTraded: String,
  ListingExchange: String,
  MarketCategory: String,
  ETF: String,
  RoundLotSize: Number,
  TestIssue: String,
  FinancialStatus: String,
  CQSSymbol: String,
  NASDAQSymbol: String,
  NextShares: String,
});

const symbolValidMetaData = mongoose.model(
  "symbolValidMetaData",
  symbolValidMetaDataSchema
);
module.exports = symbolValidMetaData;
