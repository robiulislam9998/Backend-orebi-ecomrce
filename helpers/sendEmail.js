const nodemailer = require("nodemailer");

async function sendEmail(email, verify, templet) {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "hackedby1947@gmail.com",
      pass: "bmylyncbjnqrjvar",
    },
  });

  const info = await transporter.sendMail({
    from: "hackedby1947@gmail.com",
    to: email,
    subject: "OTP ✔",
    html: templet(verify),
  });
}
module.exports = sendEmail;
