const express = require("express");
const _ = express.Router();
const registrationController = require("../../controllers/registrationController.js");
const loginController = require("../../controllers/loginController.js");
const randomOtpMatch = require("../../controllers/randomOtpMatch.js");

_.get("/registration", registrationController);
_.post("/login", loginController);
_.post("/otpmatch", randomOtpMatch);

module.exports = _;
