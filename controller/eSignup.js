const Employer = require("../models/Employer");
const bcrypt = require("bcrypt");

exports.eSignupRender = (req, res) => {
  res.render("eSignup");
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
    let employer = await Employer.findOne({ email });
    if (employer) {
      return res.status(400).send(
        `<script>alert("Company already register");</script>
         <meta http-equiv="refresh" content="0.1;url=/signup">`
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
       <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
