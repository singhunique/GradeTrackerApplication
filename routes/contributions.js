const router = require('express').Router();
const Contribution = require('../models/Contribution');

router.get('/all', async (req, res) => {
  const contributions = await Contribution.find().sort({ updatedAt: -1 });
  res.json(contributions);
});

router.post('/add', async (req, res) => {
  const { studentName, projectName, activity, status } = req.body;
  const newContribution = new Contribution({ studentName, projectName, activity, status });
  await newContribution.save();
  res.json({ message: "Contribution logged!" });
});

module.exports = router;