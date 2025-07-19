const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const mainRouter = require("./routes/index.js");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
