const express = require("express");
const router = express.Router();
const Job = require("../../models/Job");

exports.edit = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).exec();
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.render("employer/edit", { job });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
exports.editPost = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salaryMin,
      salaryMax,
      postedDate,
      expiryDate,
    } = req.body;

    // Find and update the job
    await Job.findByIdAndUpdate(req.params.id, {
      title,
      description,
      location,
      salary: {
        min: salaryMin,
        max: salaryMax,
      },
      postedDate,
      expiryDate,
    });

    // Redirect with a success message
    res.redirect("/employer/dashboard?message=Job updated successfully");
  } catch (error) {
    console.error(error);
    res.redirect("/employer/home?message=Error updating job");
  }
};

exports.delete = async (req, res) => {
  try {
    const jobId = req.params.id;

    await Job.findByIdAndDelete(jobId);

    // Redirect with a success message
    res.redirect(`/employer/home?message=Job deleted successfully`);
  } catch (error) {
    console.error(error);
    res.redirect(`/employer/home?message=Error deleting job`);
  }
};
