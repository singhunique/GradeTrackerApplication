const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  hoursLogged: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('task', TaskSchema);