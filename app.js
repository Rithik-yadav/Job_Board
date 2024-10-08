const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
// Routes
const adminRoutes = require("./routes/adminRoutes");
const jobseekerRoutes = require("./routes/jobseekerRoutes");
const employerRoutes = require("./routes/employerRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/favicon.ico", (req, res) => res.status(204).end());
// Use route files

app.use("/", jobseekerRoutes); // Routes for job seekers
app.use("/employer", employerRoutes); // Routes for employers
app.use("/job", jobRoutes); // Routes for job postings
app.get("/about", (req, res) => {
  res.render("jobseeker/about");
});
// Admin routes
app.use("/admin", adminRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
