const ComapnyController = require("../../controllers/company.controller");
const SymbolController = require("../../controllers/symbol.controller");

module.exports = (router) => {
  // get all records
  router.get("/company_data", ComapnyController.getCompanyData);
  // get by symbol
  router.post("/one_company_data", ComapnyController.getCompanyDataBySymbol);
  // get all symbols
  router.get("/symbol_data", SymbolController.getSymbolData);
};
