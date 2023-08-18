let employeeSchema = require("../../model/employeeSchema");
const { unlinkSync } = require("fs");
const { dirname } = require("path");
const path = require("path");
const { transporter } = require("../services/emailServices");
const authService = require("../services/authService");
const employeeLogger = require("../../utils/employeeLogger");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  createEmployee: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const empData = new employeeSchema(req.body);
    try {
      let isEmpExit = await authService.isEmployeeExit(req.body.empEmail);
      if (isEmpExit) {
        employeeLogger.log(
          "error",
          "Employee alreday regeisterd with this email"
        );
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "Employee is already exist with this email please login",
        });
      } else {
        if (empData.empGender === "Male") {
          let filePath = path.join(__dirname, "..", "uploads/male.jpg");
          empData.empProfilePic = filePath;
        } else {
          let filePath = path.join(__dirname, "..", "uploads/female.jpg");
          empData.empProfilePic = filePath;
        }
        empData.empPassword = await bcrypt.hash(req.body.empPassword, salt);
        empData.empName = req.body.empName.trim();
        const employee = await empData.save();
        employeeLogger.log("info", "Employee is successfully regeisterd");
        res.status(201).json({
          success: true,
          message: "Employee is successfully registerd",
          employee: employee,
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: `Eror occur${error.message}`,
      });
    }
  },

  employeeLogin: async (req, res) => {
    const { empEmail, empPassword } = req.body;
    try {
      let { value, token } = await authService.validateEmployee(
        empEmail,
        empPassword
      );
      if (value) {
        employeeLogger.log("info", "Employee was successfully logged");
        res.status(201).json({
          success: true,
          message: "login successfully",
          accessToken: token,
        });
      } else {
        employeeLogger.log("error", "Employee email or password is not valid");
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: `Error ocure ${error.message}`,
      });
    }
  },

  checktoken: (req, res) => {
    employeeLogger.log("info", "Employee token is valid");
    res.send(" Your token is valld");
  },

  sendEmpResetPassEmail: async (req, res) => {
    const { empEmail } = req.body;
    try {
      let { empData, token } = await authService.validateEmployee(empEmail);
      if (empData) {
        const link = `http://127.0.0.1:3000/employee/reset-password/${empData._id}/${token}`;
        const info = await transporter.sendMail({
          from: "wanikaustubh50@gmail.com",
          to: empEmail,
          subject: "Email for employee reset password",
          html: `<a href=${link}> click on this for reset password`,
        });
        employeeLogger.log(
          "info",
          "Employee reset email send successfully  on employee email"
        );
        return res.status(201).json({
          success: true,
          message: "Email send successfully",
          token: token,
          empId: empData._id,
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: `Error occure${error.message}`,
      });
    }
  },

  resetEmpPassword: async (req, res) => {
    const { id, token } = req.params;
    let { newPassword, confirmPassword } = req.body;
    try {
      const checkEmployee = await employeeSchema.findById(id);
      if (checkEmployee != null) {
        const secretKey = checkEmployee._id + process.env.SECRET_KEY;
        jwt.verify(token, secretKey);
        if (newPassword === confirmPassword) {
          employeeLogger.log("info", "Employee password successfully reset");
          const salt = await bcrypt.genSalt(10);
          const bcryptpassword = await bcrypt.hash(confirmPassword, salt);
          await employeeSchema.findByIdAndUpdate(checkEmployee._id, {
            $set: { empPassword: bcryptpassword },
          });
          res.status(201).json({
            success: true,
            message: "password change successfully",
          });
        } else {
          employeeLogger.log(
            "error",
            "Employee email or password is not matched"
          );
          res.status(403).json({
            success: false,
            message: "Reset password and confirm password  not matched",
          });
        }
      } else {
        employeeLogger.log("error", "Employee email is not found");
        res.status(403).json({
          success: false,
          message: " Employee email not found",
        });
      }
    } catch (err) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  setNewPassword: async (req, res) => {
    const empId = req.params.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {
      const empData = await employeeSchema.findById(empId);
      const checkPass = await bcrypt.compare(oldPassword, empData.empPassword);
      if (checkPass) {
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(newPassword, salt);
          empData.empPassword = hashPassword;
          employeeLogger.log("info", "Password updated successfully");
          await empData.save();
          res.status(201).json({
            success: true,
            message: "Password updated successfully",
          });
        } else {
          employeeLogger.log(
            "error",
            "NewPassword and confirmPassword is not match"
          );
          res.status(400).json({
            success: false,
            message: "NewPassword and confirmPassword is not match",
          });
        }
      } else {
        employeeLogger.log("error", "Invalid email or password");
        res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateEmpData: async (req, res) => {
    try {
      const employeeId = req.params.id;
      const employeeAddress = req.body.empAddress;
      let empTe;
      const newProfilePic = req.file
        ? `/uploads/employeeImage${req.file.filename}`
        : undefined;
      const updatedEmployee = await employeeSchema.findByIdAndUpdate(
        employeeId,
        {
          empProfilePic: newProfilePic,
          empAddress: employeeAddress,
        },
        { new: true }
      );
      if (!updatedEmployee) {
        employeeLogger.log("error", "Employee not found");
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      } else {
        employeeLogger.log(
          "info",
          "Profile pic and address updated successfully"
        );
        res.status(201).json({
          success: true,
          message: "Profile pic and address updated successfully ✔",
        });
      }
    } catch (err) {
      employeeLogger.log("error", err.message);
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },
};
