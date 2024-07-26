const express = require("express");
const router = express.Router();
const admin = require("../controller/admin/admin");
const login = require("../controller/admin/adminLogin");

router.get("/login", login.loginRender);
router.get("/signup", login.signupRender);
// Admin dashboard
router.get("/dashboard", admin.dashboard);

// Manage employers
router.get("/employers", admin.listEmployers); // List all employers
router.get("/employers/:id", admin.employerDetails); // View details of a specific employer
router.post("/employers/:id/edit", admin.editEmployer); // Edit employer details
router.post("/employers/:id/delete", admin.deleteEmployer); // Delete an employer

// Manage jobs
router.get("/jobs/:id/edit", admin.renderEditJobForm); // Render job edit form
router.post("/jobs/:id/edit", admin.updateJob); // Update job details
router.post("/jobs/:id/delete", admin.deleteJob); // Delete a job
router.get("/jobs/:id", admin.jobDetails); // View details of a specific job
router.get("/jobs", admin.listJobs); // List all jobs

router.get("/jobseekers/:id/edit", admin.renderEditJobSeekerForm);
router.get("/jobSeekersList", admin.jobSeekerListRender);
router.post("/jobseekers/:id/update", admin.updateJobSeeker);
router.post("/jobseekers/:id/delete", admin.deleteJobSeeker);

module.exports = router;
