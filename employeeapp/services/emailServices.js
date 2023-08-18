const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_EMP,
    pass: process.env.EMP_PASS,
  },
});
const mailOption = {
  from: process.env.EMAIL_EMP,
  to: process.env.EMAIL_EMP,
  subject: "Heloo this testing email",
  text: "your packege is 67 lpa per year.",
};

module.exports = {
  transporter,
  mailOption,
};
