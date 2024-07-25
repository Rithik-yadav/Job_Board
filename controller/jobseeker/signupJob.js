const jobSeeker = require("../../models/JobSeeker");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Temporary in-memory store for OTPs
const otpStore = {};

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

    // Generate OTP
    const otp = crypto.randomBytes(3).toString("hex");

    // Store OTP and user details temporarily
    otpStore[email] = { otp, name, username, email, password };

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
      subject: "Your OTP for account verification",
      text: `Your OTP is ${otp}`,
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
  const storedOtpData = otpStore[email];

  if (!storedOtpData || storedOtpData.otp !== otp) {
    return res.status(400).send(
      `<script>alert("Invalid OTP");</script>
       <meta http-equiv="refresh" content="0.1;url=/verify-otp?email=${email}">`
    );
  }

  try {
    const { name, username, password } = storedOtpData;
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
    delete otpStore[email];

    res.status(201).send(
      `<script>alert("Registration successful");</script>
       <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
