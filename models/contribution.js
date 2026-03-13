const mongoose = require('mongoose');
const ContributionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  projectName: { type: String, required: true },
  activity: { type: String, required: true },
  status: { type: String, enum: ['Started', 'In Progress', 'Done'], default: 'Started' },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Contribution', ContributionSchema);