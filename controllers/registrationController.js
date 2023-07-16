const emailValidation = require("../helpers/emailValidation");
const User = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const sendEmail = require("../helpers/sendEmail");
const otpTemplet = require("../helpers/otpTemplet");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const nodemailer = require("nodemailer");

let registrationController = async (req, res) => {
  const { fullName, email, password, avater, facebookId } = req.body;

  if (!fullName) {
    return res.send({ error: "enter fullname" });
  } else if (!email) {
    return res.send({ error: "enter email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "enter valid email" });
  } else if (!password) {
    return res.send({ error: "enter password" });
  } else {
    let duplicateemail = await User.find({ email: email });
    if (duplicateemail.length > 0) {
      return res.send({ error: "email already exist" });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      const user = new User({
        fullName,
        email,
        password: hash,
        avater,
        facebookId,
      });
      user.save();

      const generator2 = aleaRNGFactory(Date.now());
      let randomNum = generator2.uInt32().toString().substring(0, 6);

      let rendomOTPStore = await User.findOneAndUpdate(
        { email },
        { $set: { randomOtp: randomNum } },
        { new: true }
      );

      // sendEmail(email, randomNum, otpTemplet);

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
        html: otpTemplet(randomNum),
      });

      setTimeout(async function () {
        console.log("delate");
        let rendomOTPStore = await User.findOneAndUpdate(
          { email },
          { $unset: { randomOtp: "" } },
          { new: true }
        );
      }, 180000);

      res.send({
        success: "registration successfull",
        fullName: user.fullname,
        email: user.email,
      });
    });
    // return res.send({ success: "registration successfull" });
  }
};
module.exports = registrationController;
