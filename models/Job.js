const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  mode: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "employer" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobSeeker" }],
  postedDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  salary: {
    min: { type: Number },
    max: { type: Number },
  },
  jobType: { type: String },
  experience: { type: String },
  skills: [{ type: String }],
  education: { type: String },
  companyWebsite: { type: String },
  contactEmail: { type: String },
  status: { type: String, default: "Active" },
  industry: { type: String },
  benefits: [{ type: String }],
});

module.exports = mongoose.models.job || mongoose.model("job", jobSchema);
