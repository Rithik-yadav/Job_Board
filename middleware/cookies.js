const jwt = require("jsonwebtoken");
const JobSeeker = require("../models/JobSeeker");
const Employer = require("../models/Employer");

exports.setCookies = (user, res, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, "Rithik", { expiresIn: "15m" });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "strict",
  });
  console.log("cookies set");
};

exports.checkCookiesJobseeker = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send(
      `<script>alert("You must login First");</script>
             <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  }
  const decode = jwt.verify(token, "Rithik");
  try {
    req.user = await JobSeeker.findById(decode.id);
    if (!req.user) {
      return res.status(500).send(
        `<script>alert("You are not authorised for this ");</script>
      <meta http-equiv="refresh" content="0.1;url=/login">`
      );
    }
    console.log("JobSeeker cookies set");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(
      `<script>alert("An error occurred. Please try again later.");</script>
    <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  }
};
exports.checkCookiesEmployer = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(500).send(
      `<script>alert("You are not authorised for this");</script>
    <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  }
  const decode = jwt.verify(token, "Rithik");
  try {
    req.user = await Employer.findById(decode.id);
    if (!req.user) {
      return res.status(401).redirect("employer/login"); // Redirect to login on not found
    }
    console.log("Employer Cookies checked");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(
      `<script>alert("An error occurred. Please try again later.");</script>
    <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  }
};
