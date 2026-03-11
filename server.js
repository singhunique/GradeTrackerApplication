const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

// 1. Routes (Replace with your actual route file names)
// app.use('/api/tasks', require('./routes/tasks'));

// 2. Database & Auto-Seed
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
// Enhanced Seed User Logic
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

      // DEBUG: Log all users currently in DB to verify
      const allUsers = await User.find({}, 'email');
      console.log('📊 Current Registered Emails:', allUsers.map(u => u.email));

    } catch (err) {
      console.log('❌ Error during user seeding:', err);
    };

  .catch(err => console.log('❌ DB Error:', err));

// 3. Serve Frontend
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});