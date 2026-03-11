const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // In a real app, use 'bcrypt' to compare encrypted passwords
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;