const Job = require("../../models/Job");

exports.jobFeed = async (req, res) => {
  try {
    // Fetch all jobs along with their associated employer data
    const jobs = await Job.find().populate("company").exec();

    res.render("jobseeker/feed", { jobs }); // Updated path to match the new folder structure
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching job postings");
  }
};
