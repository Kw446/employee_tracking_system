const empLeaveSchema = require("../../model/empLeaveSchema");
const empTimeSheetSchema = require("../../model/empTimeSheetSchema");
const employeeSchema = require("../../model/employeeSchema");
const { transporter } = require("../../employeeapp/services/emailServices");

module.exports = {
  adminDashboard: async (req, res) => {
    try {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
      const empData = await empTimeSheetSchema
        .find(
          {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
          { _id: 0, empClockIn: 1, empClockOut: 1 }
        )
        .populate({ path: "employeeId", select: "empName" });
      res.status(200).json({
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

  empLeaveStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { empLeaveStatus } = req.body;
      const type = await empLeaveSchema.findById(id);
      const employee = await employeeSchema.findById(type.employeeId);
      const leave = await empLeaveSchema.findByIdAndUpdate(
        id,
        { empLeaveStatus },
        { new: true }
      );
      const user = await empLeaveSchema.findById(leave.id);
      if (empLeaveStatus === "accepted") {
        if (type.empLeaveType === "casual") {
          user.empCasualLeaves -= 1;
        }
        emailText = `Your leave is <span style="color: green;">accepted</span>.`;
        emailColor = "green";
      } else {
        emailText = `Your leave is <span style="color: red;">rejected</span>.`;
        emailColor = "red";
      }
      const htmlContent = `
            <html>
                <body>
                    <p style="color: ${emailColor};">${emailText}</p>
                </body>
            </html>
        `;
      let info = await transporter.sendMail({
        from: "wanikaustubh50@gmail.com",
        to: employee.empEmail,
        subject: "Regarding Leave",
        text: "your leave is accpeted",
      });

      if (empLeaveStatus === "accepted") {
        if (type.empLeaveType === "sick") {
          user.empSickLeaves -= 1;
        }
      }

      await Promise.all([leave.save(), user.save()]);
      res.status(201).json({
        success: true,
        message: "Leave status updated ",
        leave: leave,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
