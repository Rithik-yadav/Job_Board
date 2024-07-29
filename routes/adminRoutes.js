const express = require("express");
const router = express.Router();
const admin = require("../controller/admin/admin");
const login = require("../controller/admin/adminLogin");
const cookie = require("../middleware/cookies");

router.post("/login", login.loginPost);
router.get("/login", login.loginRender);
router.get("/logout", login.logout);
// router.get("/signup", login.signupRender);
// Admin dashboard
router.get("/dashboard", cookie.checkCookiesAdmin, admin.dashboard);

// Manage employers
router.get("/employers", cookie.checkCookiesAdmin, admin.listEmployers); // List all employers
router.get("/employers/:id", cookie.checkCookiesAdmin, admin.employerDetails); // View details of a specific employer
router.post(
  "/employers/:id/edit",
  cookie.checkCookiesAdmin,
  admin.editEmployer
); // Edit employer details
router.post(
  "/employers/:id/delete",
  cookie.checkCookiesAdmin,
  admin.deleteEmployer
); // Delete an employer

// Manage jobs
router.get("/jobs/:id/edit", cookie.checkCookiesAdmin, admin.renderEditJobForm); // Render job edit form
router.post("/jobs/:id/edit", cookie.checkCookiesAdmin, admin.updateJob); // Update job details
router.post("/jobs/:id/delete", cookie.checkCookiesAdmin, admin.deleteJob); // Delete a job
router.get("/jobs/:id", cookie.checkCookiesAdmin, admin.jobDetails); // View details of a specific job
router.get("/jobs", cookie.checkCookiesAdmin, admin.listJobs); // List all jobs

router.get("/jobseekers/:id/edit", admin.renderEditJobSeekerForm);
router.get("/jobSeekersList", admin.jobSeekerListRender);
router.post("/jobseekers/:id/update", admin.updateJobSeeker);
router.post("/jobseekers/:id/delete", admin.deleteJobSeeker);

module.exports = router;
