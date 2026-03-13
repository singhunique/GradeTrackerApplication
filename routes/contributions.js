const express = require('express');
const router = express.Router();
const Contribution = require('../models/Contribution');

// 1. GET ALL: Load the team tasks for the dashboard
router.get('/all', async (req, res) => {
    try {
        const contributions = await Contribution.find().sort({ studentName: 1 });
        res.json(contributions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching team data" });
    }
});

// 2. UPDATE STATUS: The core function for your "Update" button
router.put('/update/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedContribution = await Contribution.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true } // Returns the updated document
        );
        res.json(updatedContribution);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
});

// 3. ADD NEW: If you want to add a 4th student or a new task
router.post('/add', async (req, res) => {
    try {
        const newEntry = new Contribution(req.body);
        await newEntry.save();
        res.json({ message: "Task assigned!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;