const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avater: {
    type: String,
  },
  emailverifiy: {
    type: Boolean,
    default: false,
  },
  marchent: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "member",
    enum: ["admin", "member", "marchent"],
  },
  randomOtp: {
    type: String,
  },
  update: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  facebookId: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
