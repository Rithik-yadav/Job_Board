const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  mode: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobSeeker" }],
  postedDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
});

module.exports = mongoose.models.job || mongoose.model("job", jobSchema);
