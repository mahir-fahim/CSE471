// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  milestoneProgress: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  password: String,
  weight: Number,
  height: Number,
  targetWeight: Number,
  currentWeight: Number,
  workoutPlan: String,
  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  foodHabit: {
    type: String,
    enum: ["Vegetarian", "Non-Vegetarian", "Vegan"],
  },
});

// Check if the model is already compiled
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
