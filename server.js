const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database & Auto-Seed Logic
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    // Import models for seeding
    const User = require('./models/User');
    const Project = require('./models/Project');
    const Contribution = require('./models/Contribution');

    try {
      // Ensure Admin User exists
      await User.findOneAndUpdate(
        { email: "admin@test.com" }, 
        { name: "Admin User", email: "admin@test.com", password: "password123" }, 
        { upsert: true }
      );

      // Seed a sample project if none exist
      const projectCount = await Project.countDocuments();
      if (projectCount === 0) {
        const sampleProj = await Project.create({ 
          name: "Student Tracker Launch", 
          description: "Initial setup of the collaboration hub" 
        });
        
        await Contribution.create({
          studentName: "System",
          projectName: sampleProj.name,
          activity: "Database initialized and seeded",
          status: "Done"
        });
        console.log('🌱 Seed data created successfully!');
      }
    } catch (err) {
      console.log('⚠️ Seeding note:', err.message);
    } 
  })
  .catch(err => console.log('❌ DB Error:', err));

// 3. API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contributions', require('./routes/contributions'));

// 4. Serve Frontend Static Files
app.use(express.static(path.join(__dirname, 'client/build')));

// 5. Catch-All Route (Fixed for Express 5 compatibility)
// We use a regex-style string to capture all paths for the React SPA
app.get('*', (req, res) => {
  // If the request is looking for an API that doesn't exist, don't send index.html
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: "API endpoint not found" });
  }
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 6. Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});