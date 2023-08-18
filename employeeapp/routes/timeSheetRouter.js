const express = require("express");
const empTimeSheet = require("../controller/timeSheetController");

let empTimeSheetRouter = express.Router();
empTimeSheetRouter.post("/clockintime/:id", empTimeSheet.empClockIn);
empTimeSheetRouter.post("/clockout/:id", empTimeSheet.empClockOut);

module.exports = empTimeSheetRouter;
