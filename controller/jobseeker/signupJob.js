const jobSeeker = require("../../models/JobSeeker");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Temporary in-memory store for OTPs
const otpStore = [];

exports.jobSignUp = (req, res) => {
  res.render("jobseeker/jobSignup");
};

exports.postSignup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    let user = await jobSeeker.findOne({ email });
    if (user) {
      return res.status(400).send(
        `<script>alert("User already used");</script>
         <meta http-equiv="refresh" content="0.1;url=/signup">`
      );
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpires = Date.now() + 900000; // OTP expires in 15 mins

    // Store OTP and user details temporarily
    otpStore.push({ email, otp, otpExpires, name, username, password });

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rithikshaabji@gmail.com",
        pass: "mzqsloddkzjkvztr",
      },
    });

    const mailOptions = {
      from: "rithikshaabji@gmail.com",
      to: email,
      subject: "JobZen Email Verification",
      text: `Your OTP for email verification is ${otp}. It is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send(
      `<script>alert("OTP sent to your email");</script>
       <meta http-equiv="refresh" content="0.1;url=/verify-otp?email=${email}">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

exports.verifyOtpGet = (req, res) => {
  const { email } = req.query;
  res.render("jobseeker/verifyOtp", { email });
};

exports.verifyOtpPost = async (req, res) => {
  const { email, otp } = req.body;

  // Find the OTP record for the given email
  const otpIndex = otpStore.findIndex((entry) => entry.email === email);

  if (otpIndex === -1) {
    return res.status(400).send(
      `<script>alert("Invalid OTP request");</script>
       <meta http-equiv="refresh" content="0.1;url=/verify-otp?email=${email}">`
    );
  }

  const otpData = otpStore[otpIndex];

  if (otpData.otp !== otp) {
    return res.status(400).send(
      `<script>alert("Invalid OTP");</script>
       <meta http-equiv="refresh" content="0.1;url=/verify-otp?email=${email}">`
    );
  }

  if (otpData.otpExpires < Date.now()) {
    otpStore.splice(otpIndex, 1); // Remove expired OTP
    return res.status(400).send(
      `<script>alert("OTP expired. Please signup again.");</script>
       <meta http-equiv="refresh" content="0.1;url=/signup">`
    );
  }

  try {
    const { name, username, password } = otpData;
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    let newUser = new jobSeeker({
      name,
      username,
      email,
      password: hashedpass,
    });
    await newUser.save();

    // Remove the OTP from the store after successful verification
    otpStore.splice(otpIndex, 1);

    res.status(201).send(
      `<script>alert("Registration successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
