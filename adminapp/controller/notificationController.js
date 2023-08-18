const empNotificationSchema = require("../../model/empNotificationSchema");

module.exports = {
  createNotification: async (req, res) => {
    const employeeId = req.params.id;
    const notification = new empNotificationSchema(req.body);
    try {
      notification.employeeId = employeeId;
      await notification.save();
      res.status(201).json({
        success: true,
        message: "Notification created successfully",
        notification: notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  updateNotification: async (req, res) => {
    const id = req.params.id;
    const notification = await empNotificationSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    try {
      await notification.save();
      res.status(201).json({
        success: true,
        message: "Notification updated successfully",
        notification: notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  deletNotification: async (req, res) => {
    const id = req.params.id;
    const notification = await empNotificationSchema.findByIdAndDelete(
      id,
      req.body,
      { new: true }
    );
    try {
      res.status(201).json({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
