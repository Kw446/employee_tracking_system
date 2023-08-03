const express = require("express");
//const {uploads}=require("../middlewares/employeeImage");
let employee = require("../controller/employeeController");
const { employeeAuthentication } = require("../middlewares/employeeToken");
const {
  registerEmpValidation,
  logInEmpValidation,
  resetPassEmpVal,
} = require("../validation/empValData");
let employeeRouter = express.Router();

employeeRouter.post("/create", registerEmpValidation, employee.createEmployee);
employeeRouter.post("/login", logInEmpValidation, employee.employeeLogin);
employeeRouter.get("/check", employeeAuthentication, employee.checktoken);
employeeRouter.post("/send", employee.sendEmpResetPassEmail);
employeeRouter.post(
  "/resetpass/:id/:token",
  resetPassEmpVal,
  employee.resetEmpPassword
);
module.exports = employeeRouter;
