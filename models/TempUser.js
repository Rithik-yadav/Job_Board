const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: "10m", default: Date.now }, // OTP expires in 10 minutes
});

module.exports = mongoose.model("TempUser", tempUserSchema);
