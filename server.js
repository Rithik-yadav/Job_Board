const app = require("./app");
const connectDB = require("./database/connectDB");

connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
