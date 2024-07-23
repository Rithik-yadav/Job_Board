const Employer = require("../../models/Employer");

exports.employerHome = async (req, res) => {
  try {
    const employer = await Employer.findById(req.user._id)
      .populate("jobsPosted")
      .exec();
    const message = req.query.message || ""; // Get message from query parameters

    res.render("employer/home", { employer, message });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
