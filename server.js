const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ DB Connection Error:', err));

// 3. Static File Hosting (The React Build)
app.use(express.static(path.join(__dirname, 'client/build')));

// 4. Catch-All for React Routing
app.use((req, res, next) => {
if (req.path.startsWith('/api')) {
return next();
}
res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 5. Port for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
console.log(🚀 Server running on port ${PORT});
});