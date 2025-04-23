const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainerSchema = new Schema(
	{
		name: { type: String, required: true },
		specialization: { type: [String], required: true }, // e.g., ["Weight Loss", "Yoga"]
		experience: { type: Number, required: true }, // in years
		certifications: { type: [String], default: [] },
		bio: { type: String, required: true },
		ratings: { type: Number, default: 0 }, // Average rating
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
			required: true,
		},
		assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of assigned users
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
