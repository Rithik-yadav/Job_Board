const Job = require("../models/Job");
const employer = require("../models/Employer");
exports.addJob = (req, res) => {
  res.render("addJob");
};

exports.addJobPost = async (req, res) => {
  const {
    title,
    description,
    location,
    mode,
    company,
    expiryDate,
    salary,
    jobType,
    experience,
    skills,
    education,
    companyWebsite,
    contactEmail,
    status,
    industry,
    benefits,
  } = req.body;
  let employerId = req.user._id;
  try {
    // Create a new job post
    const newJobPost = new Job({
      title,
      description,
      location,
      mode,
      company: employerId,
      expiryDate,
      salary,
      jobType,
      experience,
      skills,
      education,
      companyWebsite,
      contactEmail,
      status,
      industry,
      benefits,
    });

    // Save the job post to the database
    await newJobPost.save();
    req.user.jobsPosted.push(newJobPost._id);
    await req.user.save();
    res.status(400).send(
      `<script>alert("Job Posted Successfully");</script>
       <meta http-equiv="refresh" content="0.1;url=/employer/addJob">`
    );
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      message: "Error creating job post",
      error: error.message,
    });
  }
};

exports.jobFeed = async (req, res) => {
  try {
    // Fetch all jobs along with their associated employer data
    const jobs = await Job.find().populate("company").exec();
    res.render("JobsFeed", { jobs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching job postings");
  }
};
