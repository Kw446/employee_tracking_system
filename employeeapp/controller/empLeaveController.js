let empLeaveSchema = require("../../model/empLeaveSchema");

module.exports = {
  empLeave: async (req, res) => {
    const employeeId = req.params.id;
    const LeaveData = new empLeaveSchema(req.body);
    try {
      LeaveData.employeeId = employeeId;
      await LeaveData.save();
      if (LeaveData.empLeaveType === "casual") {
        res.status(201).json({
          success: true,
          message: "Appliyed for casual leave",
          LeaveInfo: LeaveData,
        });
      } else if (LeaveData.empLeaveType === "sick") {
        res.status(201).json({
          success: true,
          message: "Appliyed for sick leave",
          LeaveInfo: LeaveData,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Appliyed for other leave",
          LeaveInfo: LeaveData,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },
};
