const express = require("express");
const empLeave = require("../controller/empLeaveController");

let empLeaveRouter = express.Router();

empLeaveRouter.post("/empLeave/:id", empLeave.empLeave);

module.exports = empLeaveRouter;
