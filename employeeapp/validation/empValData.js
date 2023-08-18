const employeeSchema = require("../../model/employeeSchema");
const empValScehma = require("./empValSchema");
const Schema = require("./empValSchema");
const { unlinkSync } = require("fs");

module.exports = {
  registerEmpValidation: async (req, res, next) => {
    const value = await empValScehma.registerEmployee.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  logInEmpValidation: async (req, res, next) => {
    let value = await empValScehma.loginEmployee.validate(req.body, {
      abortEarly: false,
    });

    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  resetPassEmpVal: async (req, res, next) => {
    const value = await empValScehma.resetPassEmp.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
