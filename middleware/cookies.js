const jwt = require("jsonwebtoken");
const JobSeeker = require("../models/JobSeeker");

exports.setCookies = (user, res, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, "Rithik", { expiresIn: "15m" });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "strict",
  });
  console.log("cookies set");
};

exports.checkCookies = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send(
      `<script>alert("You must login First");</script>
             <meta http-equiv="refresh" content="0.1;url=/login">`
    );
  }
  const decode = jwt.verify(token, "Rithik");
  req.user = JobSeeker.findById(decode.id);
  console.log("Cookies checked");
  next();
};
