const mongoose = require("mongoose");

const empTimeSheetSchema = mongoose.Schema({
  empClockIn: {
    type: String,
    default:"",
  },
  empClockOut: {
    type: String,
    default:"",
  },
  empClockInIp: {
    type: String,
    default:"",
  },
  empHourseLogged: {
    type: String,
    default:"0",
  },
  empWorkingFrom: {
    type: String,
    return: true,
  },
  empTotalWorkingDays: {
    type: String,
    default:"0",
  },
  empDaysPresent: {
    type: String,
    default:"",
  },
  empHalfDays: {
    type: String,
    default:"Active",
  },
  empDaysAbsent: {
    type: String,
    default:"",
  },
  empDaysLate: {
    type: String,
    default:"0",
  },
  empHolidays: {
    type: String,
    default:"",
  },
  empStatus: {
    type: String,
    default:"",
  },
  workingStatus: {
    type: String,
    default:"",
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
