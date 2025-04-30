// routes/diet.js

const express = require('express');
const router = express.Router();
const generateDietPlan = require('../utils/dietPlanner');

router.post('/diet-plan', (req, res) => {
  const { workoutType, targetWeight, currentWeight, duration } = req.body;
  const plan = generateDietPlan(workoutType, targetWeight, currentWeight, duration);
  res.json({ plan });
});

module.exports = router;
