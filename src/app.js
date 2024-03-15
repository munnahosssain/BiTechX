const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());

// database connection
mongoose.connect(process.env.DEV_URI).then(() => {
  console.log(`Database connection is successful 🛢`.green.bold);
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
