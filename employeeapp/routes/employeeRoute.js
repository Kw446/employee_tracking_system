const express = require("express");
const { uploads } = require("../../middelwares/employeeImage");
let employee = require("../controller/employeeController");
const { employeeAuthentication } = require("../../middelwares/employeeToken");
const {
  registerEmpValidation,
  logInEmpValidation,
  resetPassEmpVal,
} = require("../validation/empValData");
const employeeAuth = require("../../middelwares/employeeAuth");
let employeeRouter = express.Router();

employeeRouter.post("/create", registerEmpValidation, employee.createEmployee);
employeeRouter.post(
  "/login",
  employeeAuth.isEmployee,
  logInEmpValidation,
  employee.employeeLogin
);
employeeRouter.get("/check", employeeAuthentication, employee.checktoken);
employeeRouter.post("/send", employee.sendEmpResetPassEmail);
employeeRouter.post(
  "/resetpass/:id/:token",
  resetPassEmpVal,
  employee.resetEmpPassword
);
employeeRouter.post("/resetold/:id/:token", employee.setNewPassword);
employeeRouter.patch(
  "/updatepic/:id",
  uploads.single("empProfilePic"),
  employee.updateEmpData
);
module.exports = employeeRouter;
