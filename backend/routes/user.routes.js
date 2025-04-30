// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const requireAuth = require("../middleware/auth");

router.get("/privacy", requireAuth, userController.getPrivacySetting);
router.put("/privacy", requireAuth, userController.updatePrivacySetting);

// Edit profile
router.put("/privacy/:userId", userController.updateProfile);

// Delete account
router.delete("/privacy/:userId", userController.deleteAccount);

router.get("/bmi/:userId", userController.calculateBMI);

router.get("/recommend/:userId", userController.recommendWorkout);
//router.get("/:userId", userController.getUserById);

router.get("/me", requireAuth, userController.getMe); // Get logged-in user

module.exports = router;
