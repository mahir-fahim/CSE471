const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
<<<<<<< HEAD

// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gymDB";

// Middleware
app.use(
	cors({
		origin: "http://localhost:5173", // frontend URL
=======
const { createServer } = require("http");
const { Server } = require("socket.io");
const User = require("./models/auth.model");

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: ["http://localhost:3000", "http://localhost:5173"],
		credentials: true,
	},
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gymDB";

app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:5173"],
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
<<<<<<< HEAD
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
=======

const Notification = require("./models/Notification");
const FitnessGoal = require("./models/fitnessGoal.model");
const generateDietPlan = require("./utils/dietPlanner");

app.use("/api/notifications", require("./routes/notification.routes.js"));

io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

	socket.on("join", (userId) => {
		socket.join(userId);
	});

	socket.on("disconnect", () => {
		console.log("A user disconnected:", socket.id);
	});
});

setInterval(async () => {
	const users = await User.find();
	for (const user of users) {
		try {
			const fitnessGoal = await FitnessGoal.findOne({ userId: user._id });
			if (!fitnessGoal) continue;

			const currentGoal = fitnessGoal.goals.find((g) => g.isCurrent);
			if (!currentGoal) continue;

			const dietPlan = generateDietPlan(
				currentGoal.goal,
				user.age,
				"daily"
			);

			const message = `Your personalized diet plan for today: ${dietPlan.join(
				", "
			)}`;
			const notification = new Notification({
				userId: user._id,
				message,
				type: "Diet",
			});
			await notification.save();
			io.to(user._id.toString()).emit("notification", notification);
			console.log(`Notification sent to user ${user._id}: ${message}`);
		} catch (error) {
			console.error(
				`Failed to send notification to user ${user._id}:`,
				error
			);
		}
	}
}, 1000 * 60 * 60 * 24); // Every 24 hours

>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("✅ Connected to MongoDB");
<<<<<<< HEAD
		// Start server only after DB connection is successful
		app.listen(PORT, () => {
=======
		httpServer.listen(PORT, () => {
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err.message);
	});
<<<<<<< HEAD
=======

const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const fitnessGoalRoutes = require("./routes/fitnessGoal.routes.js");
const trainerRoutes = require("./routes/trainer.routes.js");
const workoutRoutes = require("./routes/workout.routes.js");
const notificationRoutes = require("./routes/notification.routes.js");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fitness-goal", fitnessGoalRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/workout-session", workoutRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to the Gym Management Backend API");
});
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
