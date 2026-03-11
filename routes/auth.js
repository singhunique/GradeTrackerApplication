const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Safety Check: Ensure data was actually sent
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Normalize and Search
    // .trim() removes spaces, .toLowerCase() ignores capitalization
    const user = await User.findOne({ 
      email: email.trim().toLowerCase() 
    });

    // 3. Validation
    if (!user) {
      console.log(`❌ Login failed: ${email} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Password Check (Plain text for now)
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 5. Success
    console.log(`✅ User logged in: ${user.email}`);
    res.json({ 
      message: "Login successful", 
      user: { name: user.name, email: user.email } 
    });

  } catch (err) {
    console.error("🔥 Auth Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;