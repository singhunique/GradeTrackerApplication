\const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tracker')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Connection Error:', err));

// 3. API Routes (Check your folder names!)
// If your routes folder is at the top level, it looks like this:
// app.use('/api/grades', require('./routes/grades'));

// 4. Static File Hosting (The React Build)
// Removed the "../" because server.js is now in the same folder as the client folder
app.use(express.static(path.join(__dirname, 'client/build')));

// 5. THE CLEAN CATCH-ALL FIX
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  // Removed the "../" here as well
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));