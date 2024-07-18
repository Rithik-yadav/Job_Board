const JobSeeker = require("../models/JobSeeker");
const bcrypt = require("bcrypt");
const cookie = require("../middleware/cookies");

exports.loginJob = (req, res) => {
  res.render("jobLogin");
};

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await JobSeeker.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).send(
        `<script>alert("Invalid username or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/login">`
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send(
        `<script>alert("Invalid username or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/login">`
      );
    }

    // If the password matches, redirect to the home page
    cookie.setCookies(user, res);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send(
      `<script>alert("An error occurred. Please try again later.");</script>
       <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  }
};
