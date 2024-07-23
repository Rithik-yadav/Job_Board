const Employer = require("../../models/Employer");
const bcrypt = require("bcrypt");

exports.eSignupRender = (req, res) => {
  res.render("employer/eSignup"); // Updated path to match the new folder structure
};

exports.eSignupPost = async (req, res) => {
  let {
    companyName,
    location,
    email,
    companySize,
    industry,
    description,
    password,
  } = req.body;

  try {
    // Check if the employer already exists
    let employer = await Employer.findOne({ email });
    if (employer) {
      return res.status(400).send(
        `<script>alert("Company already registered");</script>
         <meta http-equiv="refresh" content="0.1;url=/employer/eSignup">` // Updated URL
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new employer
    await Employer.create({
      companyName,
      location,
      email,
      companySize,
      industry,
      description,
      password: hashedPassword,
    });

    res.status(201).send(
      `<script>alert("Registration successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/employer/eLogin">` // Updated URL
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
