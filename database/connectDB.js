const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(
      "mongodb://127.0.0.1:27017",
      // "mongodb+srv://RithikAdmin:1234@job-board.rz6nxuj.mongodb.net/?retryWrites=true&w=majority&appName=Job-Board",
      { dbName: "jobBoard" }
    )
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
