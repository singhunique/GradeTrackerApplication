const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Declared once here
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database & Auto-Seed Logic
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    const User = require('./models/User');
    const Project = require('./models/Project');
    const Contribution = require('./models/Contribution');

    try {
      await User.findOneAndUpdate(
        { email: "admin@test.com" }, 
        { name: "Admin User", email: "admin@test.com", password: "password123" }, 
        { upsert: true }
      );

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

// 4. Deployment Logic (Consolidated)
if (process.env.NODE_ENV === 'production') {
  // Use the build folder inside the client directory
  const buildPath = path.join(__dirname, 'client/build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    // If the request is not for an API, send the React index.html
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(buildPath, 'index.html'));
    }
  });
}

// 5. Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});