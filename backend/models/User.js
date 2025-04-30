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

<<<<<<< HEAD
module.exports = mongoose.model("Member", userSchema);
=======
module.exports = mongoose.model("User", userSchema);
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
