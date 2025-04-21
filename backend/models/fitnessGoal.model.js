const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessGoalSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		goals: [
			{
				goal: {
					type: String,
					enum: ["Weight Loss", "Muscle Gain", "Maintenance"],
					required: true,
				},
				progress: [
					{
						value: {
							type: Number,
							required: true,
						},
						date: {
							type: Date,
							required: true,
						},
					},
				],
				isCurrent: {
					type: Boolean,
					default: false, // Indicates if this is the current goal
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("FitnessGoal", fitnessGoalSchema);
