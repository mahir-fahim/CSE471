const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  currentWeight: Number,
  targetWeight: Number,

  workoutPlan: { type: String, default: "Not Assigned" },

  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  foodHabit: {
    type: String,
    enum: ["Vegetarian", "Non-Vegetarian", "Vegan"],
    default: "Non-Vegetarian",
  },
}, { timestamps: true });

// Virtual BMI
// userSchema.virtual("bmi").get(function () {
//   if (this.height && this.weight) {
//     const heightInMeters = this.height / 100;
//     return +(this.weight / (heightInMeters * heightInMeters)).toFixed(1);
//   }
//   return null;
// });

module.exports = mongoose.model("User", userSchema);
