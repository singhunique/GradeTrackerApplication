const express = require('express');
const router = express.Router();
const Contribution = require('../models/Contribution');

// GET ALL: Loads current status from MongoDB
router.get('/all', async (req, res) => {
  try {
    const allData = await Contribution.find().sort({ studentId: 1 });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: "Database Error: " + err.message });
  }
});

// UPDATE: Saves status for a specific student
router.put('/update/:studentId', async (req, res) => {
  try {
    const { status, color } = req.body;
    const updated = await Contribution.findOneAndUpdate(
      { studentId: parseInt(req.params.studentId) },
      { status, color },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update Error: " + err.message });
  }
});

// RESET ALL: Wipes the board back to 0% (Admin Feature)
router.post('/reset', async (req, res) => {
  try {
    await Contribution.updateMany({}, { status: "Pending", color: "#f43f5e" });
    res.json({ message: "All student progress has been reset." });
  } catch (err) {
    res.status(500).json({ message: "Reset Error: " + err.message });
  }
});

module.exports = router;