const mongoose = require("mongoose");
// Uncomment below line to us with docker
// mongoose.connect("mongodb://eduFund:27017/edufund", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/edufund", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected!");
});
