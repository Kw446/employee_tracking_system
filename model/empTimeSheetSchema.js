const mongoose = require("mongoose");

const empTimeSheetSchema = mongoose.Schema({
  empClockIn: {
    type: String,
    return: true,
  },
  empClockOut: {
    type: String,
    return: true,
  },
  empClockInIp: {
    type: String,
    return: true,
  },
  empHourseLogged: {
    type: String,
    return: true,
  },
  empWorkingFrom: {
    type: String,
    return: true,
  },
  empTotalWorkingDays: {
    type: String,
    return: true,
  },
  empDaysPresent: {
    type: String,
    return: true,
  },
  empHalfDays: {
    type: String,
    return: true,
  },
  empDaysAbsent: {
    type: String,
    return: true,
  },
  empDaysLate: {
    type: String,
    return: true,
  },
  empHolidays: {
    type: String,
    return: true,
  },
  empStatus: {
    type: String,
    return: true,
  },
  employeeId: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
    return: true,
  },
  isActiavte: {
    type: String,
    return: true,
  },
});
empTimeSheetSchema.set("timestamps", true);
module.exports = mongoose.model("timesheet", empTimeSheetSchema);
