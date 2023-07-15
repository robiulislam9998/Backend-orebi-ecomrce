require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection.js");
const cors = require("cors");
const routes = require("./routes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
dbConnection();
app.use(express.json());
app.use(routes);

app.get("/", function (req, res) {
  res.send("hello world");
});
app.listen(8000);
