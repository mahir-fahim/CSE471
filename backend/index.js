const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gymDB";

// Middleware
app.use(
	cors({
		origin: "http://localhost:5173", // frontend URL
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



// Routes
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const fitnessGoalRoutes = require("./routes/fitnessGoal.routes.js");
const trainerRoutes = require("./routes/trainer.routes.js");
const workoutRoutes = require('./routes/workoutRoutes');

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fitness-goal", fitnessGoalRoutes);
app.use("/api/trainers", trainerRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api', require('./routes/diet'));
app.use('/api', require('./routes/workout'));

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("✅ Connected to MongoDB");
		// Start server only after DB connection is successful
		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err.message);
	});
