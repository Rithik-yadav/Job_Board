const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  industry: { type: String },
  location: { type: String },
  companySize: { type: String },
  description: { type: String },
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

module.exports =
  mongoose.models.employer || mongoose.model("employer", employerSchema);
