const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const empValSchema = {
  registerEmployee: joi
    .object({
      empName: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "string.min": "{#label} sholud contain at least {#limit} charachter",
          "string.max": "{#label} sholud contain at least {#limit} charachter",
        })
        .required(),
      empEmail: joi.string().email().message("Invalid email adrees").required(),
      empPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required()
        .messages({
          "employeePassword.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "employeePassword.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "employeePassword.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "employeePassword.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "employeePassword.noWhiteSpaces":
            "{#label} should not contain white spaces",
          "employeePassword.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        }),
      empPhone: joi
        .number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .message("Invalid mobill number")
        .required(),
      empCity: joi.string().required(),
      empGender: joi.string().valid('male','female').required(),
      empAdress: joi.string().required(),
      empWorkingStatus: joi.string().required(),
      empTechnology: joi.string().required(),
    })
    .unknown(true),

  loginEmployee: joi
    .object({
      empEmail: joi.string().email().message("Invalid email adrees").required(),
      empPassword: joi.string().required(),
    })
    .unknown(true),

  resetPassEmp: joi.object({
    newPassword: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .messages({
        "employeePassword.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "employeePassword.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "employeePassword.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "employeePassword.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "employeePassword.noWhiteSpaces":
          "{#label} should not contain white spaces",
        "employeePassword.onlyLatinCharacters":
          "{#label} should contain only latin characters",
      }),
    confirmPassword: joiPassword
      .string()
      .messages({ "enter password": "Inavlid password" })
      .required()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .messages({
        "employeePassword.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "employeePassword.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "employeePassword.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "employeePassword.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "employeePassword.noWhiteSpaces":
          "{#label} should not contain white spaces",
        "employeePassword.onlyLatinCharacters":
          "{#label} should contain only latin characters",
      }),
  }),
};

module.exports = empValSchema;
