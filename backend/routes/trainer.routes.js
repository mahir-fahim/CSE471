const express = require("express");
const router = express.Router();
const trainerController = require("../controller/trainer.controller");
const requireAuth = require("../middleware/auth");

router.get("/", trainerController.getAllTrainers);
router.get("/current", requireAuth, trainerController.getCurrentTrainer); // New route
router.get("/:id", trainerController.getTrainerById); // New route to fetch trainer by ID
router.post("/recommendations", trainerController.getTrainerRecommendations);
router.post("/", requireAuth, trainerController.createTrainer);
router.put("/:id", requireAuth, trainerController.editTrainer);
router.delete("/:id", requireAuth, trainerController.deleteTrainer);
router.post("/assign", requireAuth, trainerController.assignTrainer);
router.post("/remove", requireAuth, trainerController.removeTrainer);

module.exports = router;
