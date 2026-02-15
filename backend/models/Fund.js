const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema({
  name: String,
  sharpeRatio: Number,
  expenseRatio: Number,
  volatility: Number,
  consistency: Number
});

module.exports = mongoose.model("Fund", fundSchema);
