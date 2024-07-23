const jobSeeker = require("../../models/JobSeeker");
const bcrypt = require("bcrypt");

exports.jobSignUp = (req, res) => {
  res.render("jobseeker/jobSignup");
};

exports.postSignup = async (req, res) => {
  let { name, username, email, password } = req.body;
  try {
    let user = await jobSeeker.findOne({ email });
    if (user) {
      return res.status(400).send(
        `<script>alert("User already used");</script>
         <meta http-equiv="refresh" content="0.1;url=/signup">`
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    let newUser = new jobSeeker({
      name,
      username,
      email,
      password: hashedpass,
    });
    await newUser.save();
    res.status(201).send(
      `<script>alert("Registration successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
