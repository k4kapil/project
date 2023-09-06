const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    emailid: String,
    password: String,
    language: String,
    country: String,
    authid: String,
    authidb: String,
    publicaddress: String,
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("Users", userSchema);

module.exports = users;
