// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // Add new fields here
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

module.exports = mongoose.model("User", userSchema);
