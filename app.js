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
const job = require("./controller/eJobs");
const admin = require("./controller/admin");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//Home
app.get("/", cookie.checkCookiesJobseeker, home.homeRender);

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

//job posting Employer side
app.get("/employer/addJob", cookie.checkCookiesEmployer, job.addJob);
app.post("/addJobPost", cookie.checkCookiesEmployer, job.addJobPost);

//feed Job
app.get("/feed", cookie.checkCookiesEmployer, job.jobFeed);

//admin
app.get("/admin/dashboard", admin.dashboard);
app.get("/admin/employers", admin.listEmployers);
app.get("/admin/employers/:id", admin.employerDetails);
app.post("/admin/employers/:id/edit", admin.editEmployer);
// server/routes/admin.js
app.post("/admin/employers/:id/delete", admin.deleteEmployer);

//asdmin jobs
// server/routes/admin.js
// server/routes/admin.js
app.get("/admin/jobs/:id/edit", admin.renderEditJobForm);
app.post("/admin/jobs/:id/edit", admin.updateJob);
app.post("/admin/jobs/:id/delete", admin.deleteJob);
app.get("/admin/jobs/:id", admin.jobDetails);
app.get("/admin/jobs", admin.listJobs);

module.exports = app;
