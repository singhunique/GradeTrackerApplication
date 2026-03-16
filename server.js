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
    
    // Lazy load models to ensure they use the active connection
    const User = require('./models/User');
    const Project = require('./models/Project');
    const Contribution = require('./models/Contribution');

    try {
      // Seed Admin
      await User.findOneAndUpdate(
        { email: "admin@test.com" }, 
        { name: "Admin User", email: "admin@test.com", password: "password123" }, 
        { upsert: true }
      );

      // Seed Initial Project Data if empty
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

// 4. Production Deployment Logic
if (process.env.NODE_ENV === 'production') {
  // Use path.join for consistent cross-platform paths
  const buildPath = path.join(__dirname, 'client', 'build');

  // Middleware: Log every request to see where it's looking (Check Render logs!)
  app.use((req, res, next) => {
    console.log(`🔍 Request for: ${req.url}`);
    next();
  });

  // Serve static files (CSS, JS, Images)
  app.use(express.static(buildPath));

  // Catch-all: Send index.html for any frontend route
  // The syntax "/{*splat}" is the most compatible catch-all for Express 5
  app.get('/{*splat}', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(buildPath, 'index.html'));
    }
  });
}
// 5. Start Server
// Render usually uses 10000, local usually 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server active on port ${PORT}`);
});