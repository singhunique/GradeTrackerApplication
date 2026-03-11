const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { calculateContribution } = require('../server/utils/calculator');

// Create a task
router.post('/', async (req, res) => {
  const { title, description, assignedTo, hoursLogged } = req.body;
  try {
    const newTask = new Task({ title, description, assignedTo, hoursLogged });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get Contribution Stats (Algorithm implementation)
router.get('/stats', async (req, res) => {
  try {
    const tasks = await Task.find();
    const stats = calculateContribution(tasks); // Your custom algorithm
    res.json(stats);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;