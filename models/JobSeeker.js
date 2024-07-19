const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  skills: [{ type: String }],
  experience: [
    {
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
});

module.exports =
  mongoose.models.JobSeeker || mongoose.model("JobSeeker", jobSeekerSchema);
