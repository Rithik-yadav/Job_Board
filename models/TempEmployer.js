const mongoose = require("mongoose");

const tempEmployerSchema = new mongoose.Schema({
  companyName: String,
  location: String,
  email: { type: String, required: true, unique: true },
  companySize: String,
  industry: String,
  description: String,
  password: String,
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model("TempEmployer", tempEmployerSchema);
