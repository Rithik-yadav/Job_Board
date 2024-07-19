const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const jobSign = require("./controller/signupJob");
const jobLogin = require("./controller/loginJob");
const cookie = require("./middleware/cookies");
const feed = require("./controller/feed");
const home = require("./controller/home");
const profile = require("./controller/profile");
const employer = require("./controller/eLogin");
const employerSignup = require("./controller/eSignup");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//Home
app.get("/", cookie.checkCookiesJobseeker, home.homeRender);

//Feed
app.get("/feed", cookie.checkCookiesJobseeker, feed.feedRender);

//profile
app.get("/profile", cookie.checkCookiesJobseeker, profile.profileRender);

//Signup
app.get("/signup", jobSign.jobSignUp);
app.post("/signup", jobSign.postSignup);

//Login
app.get("/login", jobLogin.loginJob);
app.post("/login", jobLogin.loginPost);

//employer login signup
app.get("/employer/login", employer.eLoginRender);
app.post("/employer/login", employer.eLoginPost);

//employer signup
app.get("/employer/signup", employerSignup.eSignupRender);
app.post("/employer/signup", employerSignup.eSignupPost);

module.exports = app;
