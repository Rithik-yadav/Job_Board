const express = require("express");
const router = express.Router();
const job = require("../controller/jobseeker/feed");
const cookie = require("../middleware/cookies");

// Feed Job
router.get("/feed", cookie.checkCookiesJobseeker, job.jobFeed);
router.get("/:id/apply", cookie.checkCookiesJobseeker, job.apply);

module.exports = router;
