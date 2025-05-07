// scripts/seedWorkoutPlans.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const WorkoutPlan = require("./models/WorkoutPlan");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gymDB";

const workoutPlans = [
  {
    title: "Fat Burn Plan",
    description:
      "A plan focused on reducing body fat through cardio and high-rep workouts.",
    fitnessLevel: "Beginner",
    exercises: [
      {
        name: "Jumping Jacks",
        sets: 3,
        reps: "30 seconds",
        rest: "30s",
        day: "Monday",
      },
      { name: "Burpees", sets: 3, reps: "12", rest: "45s", day: "Monday" },
      {
        name: "Mountain Climbers",
        sets: 3,
        reps: "20",
        rest: "30s",
        day: "Tuesday",
      },
      {
        name: "Running",
        sets: 1,
        reps: "20 mins",
        rest: "-",
        day: "Wednesday",
      },
    ],
  },
  {
    title: "Muscle Gain Plan",
    description: "A strength training plan to build muscle mass and power.",
    fitnessLevel: "Intermediate",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8", rest: "60s", day: "Monday" },
      { name: "Squats", sets: 4, reps: "10", rest: "90s", day: "Tuesday" },
      { name: "Deadlifts", sets: 3, reps: "6", rest: "90s", day: "Wednesday" },
      { name: "Pull-Ups", sets: 3, reps: "Max", rest: "60s", day: "Thursday" },
    ],
  },
  {
    title: "Endurance Plan",
    description: "Improve cardiovascular health and muscular endurance.",
    fitnessLevel: "Advanced",
    exercises: [
      { name: "Cycling", sets: 1, reps: "30 mins", rest: "-", day: "Monday" },
      { name: "Swimming", sets: 1, reps: "20 mins", rest: "-", day: "Tuesday" },
      {
        name: "Treadmill Run",
        sets: 1,
        reps: "5 km",
        rest: "-",
        day: "Wednesday",
      },
      {
        name: "Jump Rope",
        sets: 5,
        reps: "2 mins",
        rest: "30s",
        day: "Thursday",
      },
    ],
  },
  {
    title: "Lean & Toned Plan",
    description:
      "High-rep, low-rest workouts for toning muscles and reducing fat.",
    fitnessLevel: "Beginner",
    exercises: [
      {
        name: "Bodyweight Squats",
        sets: 4,
        reps: "20",
        rest: "30s",
        day: "Monday",
      },
      {
        name: "Lunges",
        sets: 3,
        reps: "15 each leg",
        rest: "30s",
        day: "Tuesday",
      },
      { name: "Push-Ups", sets: 3, reps: "15", rest: "30s", day: "Wednesday" },
      { name: "Plank", sets: 3, reps: "60s", rest: "30s", day: "Thursday" },
    ],
  },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected. Seeding workout plans...");

    await WorkoutPlan.deleteMany();
    await WorkoutPlan.insertMany(workoutPlans);

    console.log("✅ Workout plans seeded successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error seeding workout plans:", err);
  });
