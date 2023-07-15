const emailValidation = require("../helpers/emailValidation");
const User = require("../models/usersModel.js");
const bcrypt = require("bcrypt");

let loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.send({ error: "enter email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "enter valid email" });
  } else if (!password) {
    return res.send({ error: "enter password" });
  } else {
    let checkEmail = await User.find({ email });

    if (checkEmail.length > 0) {
      bcrypt.compare(password, checkEmail[0].password).then(function (result) {
        if (result) {
          res.send({
            success: "registration successfull",

            email: checkEmail.email,
            password: checkEmail.password,
          });
        } else {
          res.json({ error: "password not macth" });
        }
      });
    } else {
      res.json({ error: "email not found" });
    }
  }
};
module.exports = loginController;
