const mongoose = require("mongoose");
const logger= require("../utils/logger");
mongoose.connect(process.env.URL, {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose is not connect" + err);
  logger.log("error", "mongoose connection error");
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is  conected successfully");
  logger.log("info", "mongoose connected successfully");
});
