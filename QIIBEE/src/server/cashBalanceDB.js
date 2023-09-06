const mongoose = require("mongoose");

const cashBalance = new mongoose.Schema(
  {
    authid: String,
    cashBalance: String,
  },
  {
    timestamps: true,
  }
);
const cashes = mongoose.model("Cash", cashBalance);

module.exports = cashes;
