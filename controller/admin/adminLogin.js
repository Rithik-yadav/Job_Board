const Admin = require("../../models/Admin");
const cookie = require("../../middleware/cookies");

exports.loginRender = (req, res) => {
  res.render("admin/login");
};

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username }).select("+password");

    // Check if the user exists
    if (!user) {
      return res.status(400).send(
        `<script>alert("Invalid username or password");</script>
         <meta http-equiv="refresh" content="0.1;url=/admin/login">` // Updated URL
      );
    }

    if (password !== user.password) {
      return res.status(400).send(
        `<script>alert("Invalid username or password");</script>
           <meta http-equiv="refresh" content="0.1;url=/admin/login">`
      );
    }
    // Set cookies for the authenticated user
    cookie.setCookies(user, res);
    res.redirect("/admin/dashboard"); // Redirect to home page or dashboard
  } catch (error) {
    console.error(error);
    res.status(500).send(
      `<script>alert("An error occurred. Please try again later.");</script>
       <meta http-equiv="refresh" content="0.1;url=/admin/login">` // Updated URL
    );
  }
};
exports.logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });
  res.redirect("/admin/login");
};
