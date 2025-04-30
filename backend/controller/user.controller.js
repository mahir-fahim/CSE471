const User = require("../models/auth.model");
const WorkoutPlan = require("../models/WorkoutPlan");
const requireAuth = require("../middleware/auth");

// GET privacy setting
exports.getPrivacySetting = async (req, res) => {
  try {
    const userId = req.user.id; // comes from JWT middleware
    const user = await User.findById(userId).select("privacy");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ privacy: user.privacy });
  } catch (error) {
    console.error("Get privacy error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE privacy setting
exports.updatePrivacySetting = async (req, res) => {
  try {
    const userId = req.user.id;
    const { privacy } = req.body;

    if (typeof privacy !== "boolean") {
      return res.status(400).json({ message: "Privacy must be true or false" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { privacy },
      { new: true }
    ).select("privacy");

    res.status(200).json({
      message: "Privacy setting updated",
      privacy: updatedUser.privacy,
    });
  } catch (error) {
    console.error("Update privacy error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};

exports.calculateBMI = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { height, weight } = user;

    if (!height || !weight) {
      return res
        .status(400)
        .json({ error: "Height and weight must be set to calculate BMI" });
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    res.json({
      bmi: bmi.toFixed(2),
      category: getBMICategory(bmi),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error calculating BMI" });
  }
};

// Optional: categorize BMI
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal weight";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
}

exports.recommendWorkout = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Fetch user and ensure height & weight exist
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { height, weight } = user;
    if (!height || !weight) {
      return res
        .status(400)
        .json({ error: "Height and weight are required for recommendation" });
    }

    // 2. Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal";
    else category = "Overweight";

    // 3. Decide fitness level & target
    let fitnessLevel, target;

    switch (category) {
      case "Underweight":
        fitnessLevel = "Beginner";
        target = "Muscle Gain";
        break;
      case "Normal":
        fitnessLevel = "Intermediate";
        target = "General Fitness";
        break;
      case "Overweight":
        fitnessLevel = "Beginner";
        target = "Fat Burn";
        break;
    }

    // 4. Query workout plans
    const recommendedPlans = await WorkoutPlan.find({
      fitnessLevel,
      target,
    });

    res.json({
      bmi: bmi.toFixed(2),
      category,
      fitnessLevel,
      target,
      recommendedPlans,
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ error: "Failed to recommend workout plans" });
  }
};

// exports.getUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findById(userId).select("-password -__v");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     return res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// req.user was set by requireAuth middleware
