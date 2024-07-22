const express = require("express");
const router = express.Router();
const job = require("../controller/eJobs");
const cookie = require("../middleware/cookies");

// Feed Job
router.get("/feed", cookie.checkCookiesEmployer, job.jobFeed); // Render job feed

module.exports = router;
