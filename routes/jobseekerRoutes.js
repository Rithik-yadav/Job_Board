const express = require("express");
const router = express.Router();
const jobSign = require("../controller/signupJob");
const jobLogin = require("../controller/loginJob");
const cookie = require("../middleware/cookies");
const profile = require("../controller/profile");
const home = require("../controller/home");

// Signup
router.get("/signup", jobSign.jobSignUp); // Render signup form
router.post("/signup", jobSign.postSignup); // Handle signup form submission

// Login
router.get("/login", jobLogin.loginJob); // Render login form
router.post("/login", jobLogin.loginPost); // Handle login form submission
router.get("/profile", cookie.checkCookiesJobseeker, profile.profileRender);
router.get("/", cookie.checkCookiesJobseeker, home.homeRender);

module.exports = router;
