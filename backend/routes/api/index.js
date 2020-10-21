const { Router } = require("express");
const apiRouter = new Router();
const setupCompanyRoutes = require("./company.routes");
const setupLoginRoutes = require("./login.routes");
setupCompanyRoutes(apiRouter);
setupLoginRoutes(apiRouter);
module.exports = apiRouter;
