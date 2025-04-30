const express = require('express');
const router = express.Router();
const workoutController = require('../controller/workoutController');

router.post('/start', workoutController.startWorkout);
router.patch('/end/:sessionId', workoutController.endWorkout);
router.get('/user/:userId', workoutController.getUserWorkouts); // optional

module.exports = router;
