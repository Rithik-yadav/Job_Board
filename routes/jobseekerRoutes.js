const express = require("express");
const router = express.Router();
const jobSign = require("../controller/jobseeker/signupJob");
const jobLogin = require("../controller/jobseeker/loginJob");
const cookie = require("../middleware/cookies");
const profile = require("../controller/jobseeker/profile");
const home = require("../controller/jobseeker/home");

// Signup
router.get("/signup", jobSign.jobSignUp); // Render signup form
router.post("/signup", jobSign.postSignup); // Handle signup form submission
// router.post("/verify-otp", jobSign.verifyOtp);
router.get("/verify-otp", jobSign.verifyOtpGet); // Render OTP verification form
router.post("/verify-otp", jobSign.verifyOtpPost);
// Login
router.get("/login", jobLogin.loginJob); // Render login form
router.post("/login", jobLogin.loginPost); // Handle login form submission
router.get("/profile", cookie.checkCookiesJobseeker, profile.profileRender);
router.get("/", cookie.checkCookiesJobseeker, home.homeRender);

module.exports = router;
