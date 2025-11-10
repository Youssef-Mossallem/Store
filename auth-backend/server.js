const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Health check for root
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Use process.env.PORT for Vercel compatibility
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

module.exports = app; // مهم لو هنعمل export للسيرفر على Vercel

