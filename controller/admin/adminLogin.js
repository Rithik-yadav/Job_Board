const Admin = require("../../models/Admin");

exports.loginRender = (req, res) => {
  res.render("admin/login");
};
exports.signupRender = (req, res) => {
  res.render("admin/signup");
};
