const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
  empTotalLeaves: {
    type: String,
    return: true,
  },
  empCasualLeaves: {
    type: String,
    default:"10",
  },
  empSickLeaves: {
    type: String,
    default:"10",
  },
  empLeaveType: {
    type: String,
    default:"casual",
  },
  empLeaveStatus: {
    type: String,
    enum:["accepted","rejected","pending"],
    default:"pending",
  },
  empMessage: {
    type: String,
    default:"0",
  },
  startDate:{
   type:Date,
   require:true,
  },
  endDate:{
 type:String,
 require:true,
  },
  employeeId: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
    return: true,
  },
  isActiavte: {
    type: Boolean,
    default: true,
  },
});
empLeaveSchema.set("timestamps", true);
module.exports = mongoose.model("empLeave", empLeaveSchema);
