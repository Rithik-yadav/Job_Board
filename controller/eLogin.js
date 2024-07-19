const Employer = require("../models/Employer");
const bcrypt = require("bcrypt");
const cookie = require("../middleware/cookies");

exports.eLoginRender = (req, res) => {
  res.render("eLogin");
};

exports.eLoginPost = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Find the employer by email
    const employer = await Employer.findOne({ email }).select("+password");

    // Validate email and password
    if (!employer || !(await bcrypt.compare(password, employer.password))) {
      return res
        .status(401)
        .render("eLogin", { error: "Invalid email or password" });
    }

    // Set cookies with secure options
    cookie.setCookies(employer, res);

    // Redirect to appropriate employer dashboard
    res.redirect("/employer/addJob"); // Replace with your employer dashboard route
  } catch (error) {
    console.error(error);
    res.status(500).render("eLogin", {
      error: "An error occurred. Please try again later.",
    });
  }
};
