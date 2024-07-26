// server/controllers/adminController.js
const Employer = require("../../models/Employer");
const Job = require("../../models/Job");
const JobSeeker = require("../../models/JobSeeker");

// Controller function for rendering the dashboard
exports.dashboard = async (req, res) => {
  try {
    const totalEmployers = await Employer.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalJobSeekers = await JobSeeker.countDocuments();

    const recentJobs = await Job.find().sort({ postedDate: -1 }).limit(5);
    const recentJobSeekers = await JobSeeker.find()
      .sort({ createdAt: -1 })
      .limit(5);
    const recentEmployers = await Employer.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("admin/dashboard", {
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
    res.render("admin/employers", { employers });
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
    res.render("admin/employerDetails", { employer });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete an employer
exports.deleteEmployer = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);

    if (!employer) {
      return res.status(404).send("Employer not found");
    }

    await Job.deleteMany({ company: employer._id });
    await Employer.findByIdAndDelete(req.params.id);

    res.redirect("/admin/employers");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Edit employer details (form submission)
exports.editEmployer = async (req, res) => {
  try {
    await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/admin/employers`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// List all jobs
exports.listJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company").exec();
    res.render("admin/jobsList", { jobs });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// View job details
exports.jobDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate("company");
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.render("admin/jobDetails", { job });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Render the edit job form
exports.renderEditJobForm = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.render("admin/editJob", { job });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update job details
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

exports.jobSeekerListRender = async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find();
    res.render("admin/jobSeekersList", { jobSeekers });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
// Delete a job
exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    await JobSeeker.updateMany(
      { appliedJobs: id },
      { $pull: { appliedJobs: id } }
    );

    await Employer.updateMany(
      { jobsPosted: id },
      { $pull: { jobsPosted: id } }
    );

    await Job.findByIdAndDelete(id);

    res.redirect("/admin/jobs");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Edit job seeker details (form submission)
exports.renderEditJobSeekerForm = async (req, res) => {
  const { id } = req.params;
  try {
    const jobSeeker = await JobSeeker.findById(id);
    if (!jobSeeker) {
      return res.status(404).send("Job Seeker not found");
    }
    res.render("admin/editJobSeeker", { jobSeeker });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update job seeker details
exports.updateJobSeeker = async (req, res) => {
  const { id } = req.params;
  const { username, email, name, skills, experience, education } = req.body;

  try {
    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      id,
      { username, email, name, skills, experience, education },
      { new: true, runValidators: true }
    );

    if (!updatedJobSeeker) {
      return res.status(404).send("Job Seeker not found");
    }

    res.status(201).send(
      `<script>alert("JobSeeker Update successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/admin/jobSeekers/${id}/edit">`
    );
    // res.redirect(`/admin/jobSeekers/${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a job seeker
exports.deleteJobSeeker = async (req, res) => {
  const { id } = req.params;
  try {
    const jobSeeker = await JobSeeker.findById(id);

    if (!jobSeeker) {
      return res.status(404).send("Job Seeker not found");
    }

    await JobSeeker.findByIdAndDelete(id);

    res.status(201).send(
      `<script>alert("JobSeeker Deletion successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/admin/dashboard">`
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};
