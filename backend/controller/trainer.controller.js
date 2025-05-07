const Trainer = require("../models/trainer.model");
const User = require("../models/auth.model");

exports.getTrainerRecommendations = async (req, res) => {
  try {
    const { fitnessGoal, preferences } = req.body;

    // Validate input
    if (!fitnessGoal) {
      return res.status(400).json({ message: "Fitness goal is required" });
    }

    // Match trainers based on specialization and preferences
    const query = {
      specialization: { $in: [fitnessGoal] },
    };
    if (preferences?.gender) {
      query.gender = preferences.gender;
    }

    const trainers = await Trainer.find(query).sort({ ratings: -1 }); // Sort by ratings
    res.status(200).json({ trainers });
  } catch (error) {
    console.error("Error fetching trainer recommendations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json({
      message: "Trainer created successfully",
      trainer,
    });
  } catch (error) {
    console.error("Error creating trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing trainer
exports.editTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Trainer updated successfully",
      trainer: updatedTrainer,
    });
  } catch (error) {
    console.error("Error editing trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a trainer
exports.deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    await Trainer.findByIdAndDelete(id);
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Assign a trainer to a user
exports.assignTrainer = async (req, res) => {
  try {
    const { trainerId } = req.body;
    const userId = req.user.id;

    // Check if the user already has a trainer
    const existingTrainer = await Trainer.findOne({
      assignedUsers: userId,
    });
    if (existingTrainer) {
      return res
        .status(400)
        .json({ message: "You already have a trainer assigned" });
    }

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Assign trainer to user
    trainer.assignedUsers.push(userId);
    await trainer.save();

    res.status(200).json({
      message: "Trainer assigned successfully",
      trainer,
    });
  } catch (error) {
    console.error("Error assigning trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove the current trainer from a user
exports.removeTrainer = async (req, res) => {
  try {
    const userId = req.user.id;

    const trainer = await Trainer.findOne({ assignedUsers: userId });
    if (!trainer) {
      return res.status(404).json({ message: "No trainer assigned" });
    }

    // Remove user from trainer's assignedUsers list
    trainer.assignedUsers = trainer.assignedUsers.filter(
      (id) => id.toString() !== userId
    );
    await trainer.save();

    res.status(200).json({ message: "Trainer removed successfully" });
  } catch (error) {
    console.error("Error removing trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find(); // Fetch all trainers from the database
    res.status(200).json({ trainers });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch the current trainer for the user
exports.getCurrentTrainer = async (req, res) => {
  try {
    const userId = req.user.id;
    const trainer = await Trainer.findOne({ assignedUsers: userId });
    if (!trainer) {
      return res.status(404).json({ message: "No trainer assigned" });
    }
    res.status(200).json({ trainer });
  } catch (error) {
    console.error("Error fetching current trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch a trainer by ID
exports.getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json({ trainer });
  } catch (error) {
    console.error("Error fetching trainer by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
