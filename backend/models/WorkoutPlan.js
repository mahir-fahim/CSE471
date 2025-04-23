const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: String,
  rest: String,
  day: String,
});

const workoutPlanSchema = new mongoose.Schema({
  title: String,
  description: String,
  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  target: {
    type: String,
    enum: ["Fat Burn", "Muscle Gain", "General Fitness"],
    default: "General Fitness",
  },
  exercises: [exerciseSchema],
});

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
