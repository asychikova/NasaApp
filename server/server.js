const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../nasa-app/src/models/users.js");

// For email verefircation :-

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://singhkhairaharkaran:qPDywqlgVwh1Mhox@cluster0.sevcx8o.mongodb.net/"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

app.post("/user/register", async (req, resp) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  try {
    await newUser.save();
    resp.status(201).json({ message: "You have registered successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      resp.status(409).json({ message: "User with this email already exists" });
    }
    console.error(
      "Error saving new user, server route /user/register: ",
      error
    );
    resp.status(500).json({ error: "Registration failed" });
  }
});

app.listen(port, () => {
  console.log("Server strated at port,", port);
});
