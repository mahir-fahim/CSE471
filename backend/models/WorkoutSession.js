<<<<<<< HEAD
const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number } // in seconds (optional, calculated when ending)
}, { timestamps: true });

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);
=======
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
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
