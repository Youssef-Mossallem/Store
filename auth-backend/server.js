const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.get("/", (req, res) => res.send("Server is running ✅"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error(err));

module.exports = app; // مهم للـ Vercel Serverless
