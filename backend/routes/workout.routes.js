const express = require("express");
const router = express.Router();
const workoutController = require("../controller/workout.controller");

// Create a new workout session
router.post("/", workoutController.createWorkoutSession);

// Update an existing workout session
router.put("/:id", workoutController.updateWorkoutSession);

// Get the current workout session
router.get("/current/:userId", workoutController.getCurrentWorkoutSession);

// Get all workout sessions for a user
router.get("/:userId/all", workoutController.getAllWorkoutSessions);

module.exports = router;
