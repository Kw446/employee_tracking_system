const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empName: {
    type: String,
    require: true,
  },
  empEmail: {
    type: String,
    require: true,
  },
  empPassword: {
    type: String,
    require: true,
  },
  empPhone: {
    type: Number,
    require: true,
  },
  empCity: {
    type: String,
    require: true,
  },
  empGender: {
    type: String,
    require: true,
  },
  empAdress: {
    type: String,
    default:" ",
  },
  empWorkingStatus: {
    type: String,
    require: true,
  },
  empTechnology: {
    type: String,
    require: true,
  },
  empRole: {
    type: String,
    default: "employee",
  },
  empProfilePic: {
    type: String,
  },
  isActivate: {
    type: String,
    require: true,
  },
});
employeeSchema.set("timestamps", true);
module.exports = mongoose.model("employee", employeeSchema);
