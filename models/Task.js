const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  studentName: { type: String, required: true }, // Who is doing it
  description: { type: String },                 // What they contributed
  status: { 
    type: String, 
    enum: ['Pending', 'Contributed', 'Not Started'], 
    default: 'Not Started' 
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);