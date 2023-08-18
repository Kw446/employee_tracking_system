let express = require("express");

let employeeRouter = require("./employeeapp/routes/employeeRoute");
let empTimeSheetRouter = require("./employeeapp/routes/timeSheetRouter");
let empLeaveRouter = require("./employeeapp/routes/empLeaveRouter");
let adminRoutes = require("./adminapp/routes/adminRoutes");
let empNotifiactionRouter = require("./employeeapp/routes/empNotifiactionRoute");
let empBenchRouter = require("./adminapp/routes/empBenchRoute");

let commonRouter = express.Router();

commonRouter.use("/employee", employeeRouter);
commonRouter.use("/empTimeSheet", empTimeSheetRouter);
commonRouter.use("/empLeave", empLeaveRouter);
commonRouter.use("/admin", adminRoutes);
commonRouter.use("/empnotifiaction", empNotifiactionRouter);
commonRouter.use("/empbench", empBenchRouter);

module.exports = commonRouter;
