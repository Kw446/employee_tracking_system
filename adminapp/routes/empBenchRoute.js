const express = require("express");
const benchController = require("../controller/benchController");

const BenchRouter = express.Router();

BenchRouter.get("/empbench", benchController.empbanchlist);
BenchRouter.patch("/empbenchstatus/:email", benchController.empBenchStatus);
BenchRouter.get("/emplist/:letter", benchController.searchEmp);

module.exports = BenchRouter;
