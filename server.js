const app = require("./app");
const connectDB = require("./database/connectDB");

connectDB();
app.listen(5001, (req, res) => {
  console.log("http://localhost:5000/");
});
