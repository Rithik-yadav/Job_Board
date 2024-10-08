const Employer = require("../../models/Employer");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rithikshaabji@gmail.com",
    pass: "mzqsloddkzjkvztr",
  },
});

// Temporary in-memory store for OTPs
const tempEmployers = [];

exports.eSignupRender = (req, res) => {
  res.render("employer/eSignup");
};

exports.eSignupPost = async (req, res) => {
  const {
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
         <meta http-equiv="refresh" content="0.1;url=/employer/signup">`
      );
    }

    // Check if the email is already used for temporary signup
    let tempEmployer = tempEmployers.find((temp) => temp.email === email);
    if (tempEmployer) {
      return res.status(400).send(
        `<script>alert("A signup process is already in progress for this email");</script>
         <meta http-equiv="refresh" content="0.1;url=/employer/signup">`
      );
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString("hex"); // Generate a 6-digit OTP
    const otpExpires = Date.now() + 900000; // OTP expires in 1 hour

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store temporary employer details
    tempEmployers.push({
      companyName,
      location,
      email,
      companySize,
      industry,
      description,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    // Send OTP to email
    const mailOptions = {
      from: "rithikshaabji@gmail.com",
      to: email,
      subject: "JobZen Email Verification",
      text: `Your OTP for email verification is ${otp}. It is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send(
      `<script>alert("Registration initiated. Please check your email for OTP");</script>
       <meta http-equiv="refresh" content="0.1;url=/employer/verifyOtp?email=${email}">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.verifyOtpRender = (req, res) => {
  res.render("employer/verifyOtp", { email: req.query.email });
};

exports.verifyOtpPost = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the OTP record for the given email
    const tempIndex = tempEmployers.findIndex((temp) => temp.email === email);

    if (tempIndex === -1) {
      return res.status(400).send(
        `<script>alert("Invalid OTP request");</script>
         <meta http-equiv="refresh" content="0.1;url=/employer/verifyOtp?email=${email}">`
      );
    }

    const tempEmployer = tempEmployers[tempIndex];

    if (tempEmployer.otp !== otp) {
      return res.status(400).send(
        `<script>alert("Invalid OTP");</script>
         <meta http-equiv="refresh" content="0.1;url=/employer/verifyOtp?email=${email}">`
      );
    }

    if (tempEmployer.otpExpires < Date.now()) {
      tempEmployers.splice(tempIndex, 1); // Remove expired OTP
      return res.status(400).send(
        `<script>alert("OTP expired. Please signup again.");</script>
         <meta http-equiv="refresh" content="0.1;url=/employer/signup">`
      );
    }

    // Create a new employer
    await Employer.create({
      companyName: tempEmployer.companyName,
      location: tempEmployer.location,
      email: tempEmployer.email,
      companySize: tempEmployer.companySize,
      industry: tempEmployer.industry,
      description: tempEmployer.description,
      password: tempEmployer.password,
    });

    // Remove the OTP from the store after successful verification
    tempEmployers.splice(tempIndex, 1);

    res.status(201).send(
      `<script>alert("Email verified and registration successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/employer/Login">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
