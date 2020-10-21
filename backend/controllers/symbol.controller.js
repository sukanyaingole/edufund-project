const Symbol = require("../models/symbolValidMetaData.schema");
const jwt = require("jsonwebtoken");
const loginController = require("./login.controller");

exports.getSymbolData = async (req, res) => {
  const isValidToken = loginController.verifyToken(req, res);
  if (!isValidToken.success) {
    return res.status(401).end();
  }
  try {
    Symbol.find((err, data) => {
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
