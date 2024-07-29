const Employer = require("../../models/Employer");
exports.profileRender = async (req, res) => {
  try {
    const employer = await Employer.findById(req.user.id).populate(
      "jobsPosted"
    );
    res.render("employer/profile", { employer });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.editProfile = async (req, res) => {
  try {
    await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/employer/profile`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
