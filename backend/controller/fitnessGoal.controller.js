const FitnessGoal = require("../models/fitnessGoal.model");

// Set or update fitness goal
exports.setGoal = async (req, res) => {
	try {
		const { goal } = req.body;
		const userId = req.user.id;

		if (!["Weight Loss", "Muscle Gain", "Maintenance"].includes(goal)) {
			return res.status(400).json({ message: "Invalid goal" });
		}

		let fitnessGoal = await FitnessGoal.findOne({ userId });

		if (!fitnessGoal) {
			// Create a new fitness goal document if it doesn't exist
			fitnessGoal = await FitnessGoal.create({
				userId,
				goals: [{ goal, progress: [], isCurrent: true }],
			});
		} else {
			// Set all goals to not current
			fitnessGoal.goals.forEach((g) => {
				g.isCurrent = g.goal === goal;
			});

			// Add the new goal if it doesn't exist
			if (!fitnessGoal.goals.some((g) => g.goal === goal)) {
				fitnessGoal.goals.push({ goal, progress: [], isCurrent: true });
			}

			await fitnessGoal.save();
		}

		res.status(200).json({ message: "Fitness goal updated", goal });
	} catch (error) {
		console.error("Set goal error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Get fitness goal
exports.getGoal = async (req, res) => {
	try {
		const userId = req.user.id;
		const fitnessGoal = await FitnessGoal.findOne({ userId });

		if (!fitnessGoal)
			return res.status(404).json({ message: "No fitness goals found" });

		res.status(200).json({ goals: fitnessGoal.goals });
	} catch (error) {
		console.error("Get goal error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.getProgress = async (req, res) => {
	try {
		const userId = req.user.id;
		const goal = await FitnessGoal.findOne({ userId });

		if (!goal)
			return res.status(404).json({ message: "No fitness goal set" });

		res.status(200).json({ progress: goal.progress || [] });
	} catch (error) {
		console.error("Get progress error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.addProgress = async (req, res) => {
	try {
		const userId = req.user.id;
		const { goal, value, date } = req.body;

		if (!goal || !value || !date) {
			return res
				.status(400)
				.json({ message: "Goal, value, and date are required" });
		}

		const fitnessGoal = await FitnessGoal.findOne({ userId });

		if (!fitnessGoal) {
			return res.status(404).json({ message: "No fitness goals found" });
		}

		// Find the specific goal and add progress
		const targetGoal = fitnessGoal.goals.find((g) => g.goal === goal);
		if (!targetGoal) {
			return res.status(404).json({ message: "Goal not found" });
		}

		targetGoal.progress.push({ value, date });
		await fitnessGoal.save();

		res.status(200).json({
			message: "Progress added",
			progress: targetGoal.progress,
		});
	} catch (error) {
		console.error("Add progress error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
