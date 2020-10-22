const Company = require("../models/company.schema");
const jwt = require("jsonwebtoken");
const loginController = require("./login.controller");

//All Companies data
exports.getCompanyData = async (req, res) => {
  const isValidToken = loginController.verifyToken(req, res);
  if (!isValidToken.success) {
    return res.status(401).end();
  }
  try {
    Company.find((err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  } catch (e) {
    console.log(e);
    return res.status(406).send(e);
  }
};
//get Data by symbol
exports.getCompanyDataBySymbol = (req, res) => {
  try {
    Company.findOne({ symbol: req.body.symbol }, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  } catch (e) {
    console.log(e);
    return res.status(406).send(e);
  }
};
