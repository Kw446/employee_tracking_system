const express = require("express");
const { isAdmin } = require("../../middelwares/authEmp");
const admin = require("../../employeeapp/controller/employeeController");
const adminController = require("../controller/adminController");
const notificationController = require("../../adminapp/controller/notificationController");
const adminRouter = express.Router();

adminRouter.post("/login", isAdmin, admin.employeeLogin);
adminRouter.get("/list", adminController.adminDashboard);
adminRouter.patch("/leave/:id", adminController.empLeaveStatus);
adminRouter.post(
  "/notification/:id",
  notificationController.createNotification
);
adminRouter.patch("/update/:id", notificationController.updateNotification);
adminRouter.delete("/delete/:id", notificationController.deletNotification);
module.exports = adminRouter;
