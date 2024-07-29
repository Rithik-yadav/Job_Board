const Employer = require("../../models/Employer");
const bcrypt = require("bcrypt");
const cookie = require("../../middleware/cookies");
const jwt = require("jsonwebtoken");

exports.eLoginRender = (req, res) => {
  res.render("employer/eLogin"); // Updated path to match the new folder structure
};

exports.eLoginPost = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Find the employer by email
    const employer = await Employer.findOne({ email }).select("+password");

    // Validate email and password
    if (!employer || !(await bcrypt.compare(password, employer.password))) {
      return res.status(201).send(
        `<script>alert("Invalid Username or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/employer/login">`
      );
    }

    // Set cookies with secure options
    cookie.setCookies(employer, res);

    // Redirect to appropriate employer dashboard
    res.redirect("/employer/dashboard"); // Make sure this matches your intended route
  } catch (error) {
    console.error(error);
    res.status(500).render("employer/eLogin", {
      error: "An error occurred. Please try again later.", // Updated path
    });
  }
};
exports.logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });
  res.redirect("/employer/login");
};
