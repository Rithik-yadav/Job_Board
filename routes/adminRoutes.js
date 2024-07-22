const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");

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

module.exports = router;
