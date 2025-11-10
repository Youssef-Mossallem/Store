const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// 🟢 Sign up
router.post("/signup", async (req, res) => {
  const { username, email, password, repassword, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    if (password !== repassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, phone });
    await user.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// 🔵 Log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ msg: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
