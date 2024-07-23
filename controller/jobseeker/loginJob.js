const JobSeeker = require("../../models/JobSeeker");
const bcrypt = require("bcrypt");
const cookie = require("../../middleware/cookies");

exports.loginJob = (req, res) => {
  res.render("jobseeker/jobLogin"); // Updated path to match the new folder structure
};

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await JobSeeker.findOne({ username }).select("+password");

    // Check if the user exists
    if (!user) {
      return res.status(400).send(
        `<script>alert("Invalid username or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/jobseeker/login">` // Updated URL
      );
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send(
        `<script>alert("Invalid username or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/jobseeker/login">` // Updated URL
      );
    }

    // Set cookies for the authenticated user
    cookie.setCookies(user, res);
    res.redirect("/"); // Redirect to home page or dashboard
  } catch (error) {
    console.error(error);
    res.status(500).send(
      `<script>alert("An error occurred. Please try again later.");</script>
       <meta http-equiv="refresh" content="0.1;url=/jobseeker/login">` // Updated URL
    );
  }
};
