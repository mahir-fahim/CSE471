const express = require("express");
const router = express.Router();
const fitnessGoalController = require("../controller/fitnessGoal.controller");
const requireAuth = require("../middleware/auth");

router.post("/", requireAuth, fitnessGoalController.setGoal);
router.get("/", requireAuth, fitnessGoalController.getGoal);
router.get("/progress", requireAuth, fitnessGoalController.getProgress);
router.post("/progress", requireAuth, fitnessGoalController.addProgress);

module.exports = router;
