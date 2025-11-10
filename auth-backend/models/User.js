const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true, // تأكد من أن رقم التليفون مطلوب فقط في الـ Sign Up
  },
});

module.exports = mongoose.model("User", userSchema);
