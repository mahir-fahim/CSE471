const WorkoutSession = require("../models/WorkoutSession");

exports.createWorkoutSession = async (req, res) => {
	try {
		const { userId, type, startTime, isScheduled } = req.body;
		const session = await WorkoutSession.create({
			userId,
			type,
			startTime,
			isScheduled,
		});
		res.status(201).json(session);
	} catch (error) {
		res.status(500).json({ error: "Failed to create workout session" });
	}
};

exports.updateWorkoutSession = async (req, res) => {
	try {
		const { endTime } = req.body;
		const session = await WorkoutSession.findByIdAndUpdate(
			req.params.id,
			{ endTime },
			{ new: true }
		);
		res.status(200).json(session);
	} catch (error) {
		res.status(500).json({ error: "Failed to update workout session" });
	}
};

exports.getCurrentWorkoutSession = async (req, res) => {
	try {
		const session = await WorkoutSession.findOne({
			userId: req.params.userId,
			endTime: null,
			startTime: { $lte: new Date() },
		});
		res.status(200).json(session);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch current workout session",
		});
	}
};

exports.getAllWorkoutSessions = async (req, res) => {
	try {
		const { userId } = req.params;
		const sessions = await WorkoutSession.find({ userId }).sort({
			startTime: -1,
		});
		res.status(200).json(sessions);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch workout sessions" });
	}
};
