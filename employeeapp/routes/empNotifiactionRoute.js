const express = require("express");
const notificationController = require("../../employeeapp/controller/empNotificationController");
const notificationRouter = express.Router();

notificationRouter.get("/retrive", notificationController.empNotification);

module.exports = notificationRouter;
