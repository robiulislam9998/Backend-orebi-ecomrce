const mongoose = require("mongoose");

function dbConnection() {
  mongoose
    .connect(
      "mongodb+srv://sadiaislam123:RobiuL123@cluster0.fbsn2k5.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("db connect"));
}

module.exports = dbConnection;
