const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection & Auto-Seeding
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    // Seed Tasks if empty
    const Task = require('./models/Task');
    const taskCount = await Task.countDocuments();
    if (taskCount === 0) {
      await Task.create([
        { title: "Example: Mathematics Final", status: "Pending" },
        { title: "Example: Physics Lab", status: "Completed" }
      ]);
      console.log('🌱 Task seed data added!');
    }

    // Seed User if empty
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: "Admin User",
        email: "admin@test.com",
        password: "password123" 
      });
      console.log('👤 Default User (admin@test.com) created!');
    }
  })
  .catch(err => console.log('❌ DB Connection Error:', err));

// 3. API Routes
// Note: Ensure you have these files in your /routes folder
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/tasks', require('./routes/tasks')); 

// 4. Static File Hosting (Serving React Build)
app.use(express.static(path.join(__dirname, 'client/build')));

// 5. Catch-All for React Routing
// If the request is not an /api call, send the React frontend
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 6. Port for Deployment
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});