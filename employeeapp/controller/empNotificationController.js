const empNotifiactionSchema = require("../../model/empNotificationSchema");

module.exports = {
  empNotification: async (req, res) => {
    try {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
      const empData = await empNotifiactionSchema.find(
        {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        { _id: 0, empClockIn: 1, empClockOut: 1 }
      );
      res.status(201).json({
        success: true,
        message: "All details of employee factched successfully",
        empData: empData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
