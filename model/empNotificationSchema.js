const mongoose = require("mongoose");
const empNotificationSchema = new mongoose.Schema({
  empNotificationTitle: {
    type: String,
    return: true,
  },
  empNotificationMessage: {
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
empNotificationSchema.set("timestamps", true);
module.exports = mongoose.model("notification", empNotificationSchema);
