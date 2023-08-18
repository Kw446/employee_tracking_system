const employeeSchema = require("../../model/employeeSchema");

module.exports = {
  empbanchlist: async (req, res) => {
    try {
      const list = await employeeSchema.find(
        {
          empRole: "employee",
        },
        { _id: 0, empName: 1, empEmail: 1, empWorkingStatus: 1, updatedAt: 1 }
      );
      res.status(201).json({
        success: true,
        message: list,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  empBenchStatus: async (req, res) => {
    try {
      const email = req.params.email;
      const updated = req.body.updatedStatus;
      const empData = await employeeSchema.findOneAndUpdate(
        {
          empEmail: email,
        },
        {
          empWorkingStatus: updated,
        },
        { new: true },
        { _id: 0, empName: 1, empEmail: 1, empWorkingStatus: 1, updatedAt: 1 }
      );
      res.status(201).json({
        success: true,
        status: empData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  searchEmp: async (req, res) => {
    try {
      let { letter } = req.params;
      const empData = await employeeSchema.aggregate([
        {
          $match: {
            empRole: "employee",
            $or: [
              {
                empName: { $regex: `^${letter}`, $options: "i" },
              },
              { empName: { $regex: `^${letter}`, $options: "i" } },
            ],
          },
        },
      ]);
      res.status(201).json({
        success: true,
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
