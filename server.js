const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database & Auto-Seed
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    const User = require('./models/User');
    
    try {
      // Upsert ensures the user is created if missing, or updated if they exist
      await User.findOneAndUpdate(
        { email: "admin@test.com" }, 
        { 
          name: "Admin User",
          email: "admin@test.com",
          password: "password123" 
        }, 
        { upsert: true, new: true } 
      );
      console.log('👤 Admin User (admin@test.com) is ready!');

      const allUsers = await User.find({}, 'email');
      console.log('📊 Current Registered Emails:', allUsers.map(u => u.email));

    } catch (err) {
      console.log('❌ Error during user seeding:', err);
    } 
  }) // This closing bracket was the issue!
  .catch(err => console.log('❌ DB Error:', err));

// 3. API Routes
app.use('/api/auth', require('./routes/auth'));

// 4. Serve Frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// 5. Catch-All for React
app.get('*', (req, res) => {
  // If it's an API call that doesn't exist, return 404 instead of the HTML page
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 6. Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});