const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
  empTotalLeaves: {
    type: String,
    return: true,
  },
  empCasualLeaves: {
    type: String,
    return: true,
  },
  empSickLeaves: {
    type: String,
    return: true,
  },
  empLeaveType: {
    type: String,
    return: true,
  },
  empStatus: {
    type: String,
    return: true,
  },
  empMessage: {
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
empLeaveSchema.set("timestamps", true);
module.exports = mongoose.model("empLeave", empLeaveSchema);
