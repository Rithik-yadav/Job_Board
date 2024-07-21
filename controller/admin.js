// server/controllers/adminController.js
const Employer = require("../models/Employer");
const Job = require("../models/Job");
const JobSeeker = require("../models/JobSeeker");

// Controller function for rendering the dashboard
exports.dashboard = async (req, res) => {
  try {
    // Fetch total counts and recent items from your database
    const totalEmployers = await Employer.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalJobSeekers = await JobSeeker.countDocuments();

    // Fetch recent jobs, job seekers, and employers
    const recentJobs = await Job.find().sort({ postedDate: -1 }).limit(5);
    const recentJobSeekers = await JobSeeker.find()
      .sort({ createdAt: -1 })
      .limit(5);
    const recentEmployers = await Employer.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Render the dashboard view with the data
    res.render("dashboard", {
      totalEmployers,
      totalJobs,
      totalJobSeekers,
      recentJobs,
      recentJobSeekers,
      recentEmployers,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// List all employers
exports.listEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.render("employers", { employers });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// View employer details
exports.employerDetails = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).populate(
      "jobsPosted"
    );
    res.render("employerDetails", { employer });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Delete an employer
exports.deleteEmployer = async (req, res) => {
  try {
    // Find the employer by ID
    const employer = await Employer.findById(req.params.id);

    // Check if employer exists
    if (!employer) {
      return res.status(404).send("Employer not found");
    }

    // Delete all jobs associated with this employer
    await Job.deleteMany({ company: employer._id });

    // Delete the employer
    await Employer.findByIdAndDelete(req.params.id);

    // Redirect or respond with success
    res.redirect("/admin/employers"); // Redirect to the employers list page or another appropriate page
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Edit employer details (form submission)
exports.editEmployer = async (req, res) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect(`/admin/employers`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.listJobs = async (req, res) => {
  try {
    // Assuming you have a 'Company' model and 'Job' schema has a reference to 'Company'
    const jobs = await Job.find().populate("company").exec();

    res.render("jobsList", { jobs });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// server/controllers/adminController.js

exports.jobDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate("company");
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.render("jobDetails", { job });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// server/controllers/adminController.js
// server/controllers/adminController.js

exports.renderEditJobForm = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.render("editJob", { job });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    mode,
    company,
    salary,
    jobType,
    experience,
    skills,
    education,
    companyWebsite,
    contactEmail,
    industry,
    benefits,
  } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        mode,
        company,
        salary,
        jobType,
        experience,
        skills,
        education,
        companyWebsite,
        contactEmail,
        industry,
        benefits,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).send("Job not found");
    }

    res.redirect(`/admin/jobs/${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// server/controllers/adminController.js

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the job by ID
    const job = await Job.findById(id);

    // Check if the job exists
    if (!job) {
      return res.status(404).send("Job not found");
    }

    // Remove the job from job seekers' applied jobs
    await JobSeeker.updateMany(
      { appliedJobs: id },
      { $pull: { appliedJobs: id } }
    );

    // Optionally, you might want to handle related data here
    // For example, if you have a list of jobs in the employer schema
    await Employer.updateMany(
      { jobsPosted: id },
      { $pull: { jobsPosted: id } }
    );

    // Delete the job
    await Job.findByIdAndDelete(id);

    // Redirect or respond with success
    res.redirect("/admin/jobs"); // Redirect to the jobs list page or another appropriate page
  } catch (error) {
    res.status(500).send(error.message);
  }
};
