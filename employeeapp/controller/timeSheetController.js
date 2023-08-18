const moment = require("moment");
const empTimeSheetSchema = require("../../model/empTimeSheetSchema");
const ipService = require("../services/ipService");

module.exports = {
  empClockIn: async (req, res) => {
    const employeeId = req.params.id;
    try {
      const clockInTime = new empTimeSheetSchema(req.body);
      const { empClockInIp } = await ipService.ipAddress(req.body.empClockInIp);
      clockInTime.empClockInIp = empClockInIp;
      clockInTime.empClockIn = moment().format("YYYY-MM-DD HH:mm:ss");
      clockInTime.employeeId = employeeId;
      const attendenceTime = moment("10:15:00", "HH:mm:ss");
      const empClockIn = moment(clockInTime.empClockIn, "YYYY-MM-DD HH:mm:ss");
      if (empClockIn.isAfter(attendenceTime)) {
        clockInTime.empDaysLate = "you are let";
      }
      await clockInTime.save();
      res.status(201).json({
        success: true,
        message: "Employee clock in time",
        info: clockInTime,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  empClockOut: async (req, res) => {
    try {
      const timeSheetId = req.params.id;
      const clockOutTime = await empTimeSheetSchema.findByIdAndUpdate(
        timeSheetId,
        { empClockOut: moment().format("YYYY-MM-DD HH:mm:ss") },
        { new: true }
      );
      const empClockIn = moment(clockOutTime.empClockIn, "YYYY-MM-DD HH:mm:ss");
      const empClockOut = moment(
        clockOutTime.empClockOut,
        "YYYY-MM-DD HH:mm:ss"
      );
      let empHourseLogged = empClockOut.diff(empClockIn, "minutes");
      if (empHourseLogged >= 8) {
        clockOutTime.empStatus = "present";
      } else if (empHourseLogged < 8) {
        clockOutTime.empStatus = "halfday";
      } else {
        clockOutTime.empStatus = "absent";
      }

      clockOutTime.empHourseLogged = `${empHourseLogged} minutes`;
      res.status(201).json({
        success: true,
        message: "Clock out successfully",
        info: clockOutTime,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },
};
