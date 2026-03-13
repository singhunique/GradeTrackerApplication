const router = require('express').Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({ name, description });
    await newProject.save();
    res.json({ message: "Project created!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;