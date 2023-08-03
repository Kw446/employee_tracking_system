let express = require("express")

let employeeRouter= require("./employeeRoute");

let commonRouter = express.Router();

commonRouter.use("/employee", employeeRouter);

module.exports = commonRouter;