const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// 1. GET PROJECT INFO: Shows the project name and description at the top
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Error fetching project details" });
    }
});

// 2. CREATE PROJECT: Setup the group project
router.post('/create', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newProject = new Project({ name, description });
        await newProject.save();
        res.json({ message: "Project created successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;