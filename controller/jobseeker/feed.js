const Job = require("../../models/Job");
const jobseeker = require("../../models/JobSeeker");
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

exports.apply = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const user = await jobseeker.findById(req.user.id);
    const applicatn = await job.applicants.push(user._id);
    const applied = await user.appliedJobs.push(job._id);
    await job.save();
    await user.save();
    res.status(201).send(
      `<script>alert("Applied successfully");</script>
       <meta http-equiv="refresh" content="0.1;url=/job/feed">`
    );
  } catch (error) {
    console.error(error);
  }
};
