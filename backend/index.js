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
		origin: "http://localhost:3000", // frontend URL
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

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

// Routes
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const fitnessGoalRoutes = require("./routes/fitnessGoal.routes.js");
const trainerRoutes = require("./routes/trainer.routes.js");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fitness-goal", fitnessGoalRoutes);
app.use("/api/trainers", trainerRoutes);

// Default route
app.get("/", (req, res) => {
	res.send("Welcome to the Gym Management Backend API");
});
