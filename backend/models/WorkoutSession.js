const mongoose = require("mongoose");

const workoutSessionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	type: { type: String, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date },
	isScheduled: { type: Boolean, default: false },
});

module.exports = mongoose.model("WorkoutSession", workoutSessionSchema);
