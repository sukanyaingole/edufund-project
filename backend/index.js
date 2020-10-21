const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const initRouters = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/connection");
// Can be moved to config
const port = 8080;
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
initRouters(app);
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
