const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const JobSeeker = require("./models/JobSeeker"); // Path to your JobSeeker model
const Employer = require("./models/employer"); // Adjust to lowercase 'employer'
const Admin = require("./models/admin"); // Path to your Admin model
const Job = require("./models/job"); // Path to your Job model
const jobSign = require("./controller/signupJob");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/feed", (req, res) => {
  res.render("feed");
});

app.get("/signup", jobSign.jobSignUp);
module.exports = app;
