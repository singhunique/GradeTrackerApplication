const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Middleware (Standard MERN)
app.use(cors());
app.use(express.json());

// 2. Database & Advanced Auto-Seed
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Green checkmark using a terminal color package (or standard console log)
    console.log('\x1b[32m%s\x1b[0m', '✅ MongoDB Connected - Student DB Ready');
    
    // ==========================================
    // SEEDING DATA FOR A LIVE PROJECT VIEW
    // ==========================================
    const Project = require('./models/Project'); // New Model
    const Contribution = require('./models/Contribution'); // New Model

    try {
      // Clear old data for a fresh Student Tracker demo
      await Project.deleteMany({});
      await Contribution.deleteMany({});

      // Create Sample Projects
      const projects = await Project.create([
        { name: "Web Design Final", description: "Design a portfolio website" },
        { name: "Data Science Project", description: "Analyze user behavior dataset" },
        { name: "Mobile App Dev", description: "Create a fitness tracking app" }
      ]);
      console.log('🚀 Projects Seeded');

      // Create Sample Contributions
      await Contribution.create([
        { studentName: "Admin User", projectName: "Web Design Final", activity: "Completed UI/UX mockup in Figma", status: "Done" },
        { studentName: "Rahul Sharma", projectName: "Web Design Final", activity: "Setup backend database schema", status: "In Progress" },
        { studentName: "Harsimran", projectName: "Data Science Project", activity: "Started cleaning the initial dataset", status: "Started" }
      ]);
      console.log('🌱 Contribution activity seeded!');

    } catch (err) {
      console.log('❌ Error during advanced seeding:', err);
    } 
  })
  .catch(err => console.log('\x1b[31m%s\x1b[0m', '❌ DB Error:', err));

// 3. New API Routes for Students/Projects
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects')); // Handles project data
app.use('/api/contributions', require('./routes/contributions')); // Handles student activity

// 4. Serve Frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// 5. Catch-All for React (Express 5.0 Compatible)
app.get('/:any*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 6. Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `🚀 Student Tracker running on port ${PORT}`);
});