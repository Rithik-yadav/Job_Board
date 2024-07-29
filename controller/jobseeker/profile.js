const JobSeeker = require("../../models/JobSeeker");
exports.profileRender = async (req, res) => {
  let id = req.user._id;
  try {
    const jobSeeker = await JobSeeker.findById(id);
    if (!jobSeeker) {
      return res.status(404).send("Job Seeker not found");
    }
    res.render("jobSeeker/profile", { jobSeeker });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update job seeker details
exports.updateJobSeeker = async (req, res) => {
  const { id } = req.params;
  console.log(id);
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
       <meta http-equiv="refresh" content="0.1;url=/profile">`
    );
    // res.redirect(`/admin/jobSeekers/${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
