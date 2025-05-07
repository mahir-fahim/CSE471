// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const requireAuth = require("../middleware/auth");
const User = require("../models/User");

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

// POST /api/user/create – Create a new user
router.post("/create", async (req, res) => {
    const { weight, height, fitnessLevel, foodHabit } = req.body;
  
    try {
      const newUser = new User({ weight, height, fitnessLevel, foodHabit });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // PUT /api/user/profile/:id – Update existing user
  router.put("/profile/:id", async (req, res) => {
    const { id } = req.params;
    const { weight, height, fitnessLevel, foodHabit } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { weight, height, fitnessLevel, foodHabit },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  });v

module.exports = router;
