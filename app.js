const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const jobSign = require("./controller/signupJob");
const jobLogin = require("./controller/loginJob");
const cookie = require("./middleware/cookies");
const feed = require("./controller/feed");
const home = require("./controller/home");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//Home
app.get("/", cookie.checkCookies, home.homeRender);

//Feed
app.get("/feed", cookie.checkCookies, feed.feedRender);

//Signup
app.get("/signup", jobSign.jobSignUp);
app.post("/signup", jobSign.postSignup);

//Login
app.get("/login", jobLogin.loginJob);
app.post("/login", jobLogin.loginPost);
module.exports = app;
