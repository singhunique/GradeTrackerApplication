const router = require('express').Router();
const Project = require('../models/Project');

// GET all contributions to see who has done what
router.get('/all', async (req, res) => {
  const projects = await Project.find().sort({ updatedAt: -1 });
  res.json(projects);
});

// POST a new contribution
router.post('/add', async (req, res) => {
  const { projectName, studentName, description, status } = req.body;
  const newEntry = new Project({ projectName, studentName, description, status });
  await newEntry.save();
  res.json({ message: "Contribution recorded!" });
});

module.exports = router;