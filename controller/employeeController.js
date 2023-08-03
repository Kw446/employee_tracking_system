let employeeSchema = require("../model/employeeSchema");
const { unlinkSync } = require("fs");
const { dirname } = require("path");
const path = require("path");

const { transporter } = require("../services/emailServices");
const authService = require("../services/authService");
const employeeLogger = require("../utils/employeeLogger");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  createEmployee: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const empData = new employeeSchema(req.body);
    try {
      let isEmpExit = await authService.isEmployeeExit(req.body.empEmail);
      if (isEmpExit) {
        employeeLogger.log("error","Employee alreday regeisterd with this email");
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "Employee is already exist with this email,please login",
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
        // const filePath = `/uploads/employeeImage/${req.file.filename}`;
        // empData.profilePic = filePath;
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
        employeeLogger.log("info", "Employee is successfully logged");
        res.status(200).json({
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
      let { empData,token } = await authService.validateEmployee(
        empEmail,
    
      );
      if (empData) {
        const link = `http://127.0.0.1:3000/employee/reset-password/${empData._id}/${token}`;
        const info = await transporter.sendMail({
          from: "kaustubhwani446@gmail.com",
          to: empEmail,
          subject: "Email for employee reset password",
          html: `<a href=${link}> click on this for reset password`,
        });
        employeeLogger.log("info", "Employee reset email send successfully ");
        return res.status(200).json({
          success: true,
          message: "Email send successfully",
          token: token,
          empId: empData._id,
        });

      } 
      // else {
      //   employeeLogger.log("error", "Employee email or password is not valid");
      //   res.status(403).json({
      //     success: false,
      //     error: "Please enter valid email",
      //   });
      // }
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
          res.status(200).json({
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
};
