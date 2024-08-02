const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require("../nasa-app/src/models/users.js");
const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://singhkhairaharkaran:qPDywqlgVwh1Mhox@cluster0.sevcx8o.mongodb.net/"
);

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello lolo" });
});

app.post("/user/register", (req, resp) => {
  console.log("I am the req in /user/register", req);
});

app.listen(port, () => {
  console.log("Server strated at port, ", port);
});
