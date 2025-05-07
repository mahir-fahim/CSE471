const WorkoutSession = require("../models/WorkoutSession");
const User = require("../models/User");

// Start a workout session
exports.startWorkout = async (req, res) => {
  try {
    const { userId } = req.body;
    const session = await WorkoutSession.create({
      user: userId,
      startTime: new Date(),
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to start workout" });
  }
};

// End a workout session

exports.endWorkout = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await WorkoutSession.findById(sessionId);
    if (!session || session.endTime) {
      return res
        .status(404)
        .json({ error: "Workout session not found or already ended" });
    }

    session.endTime = new Date();
    session.duration = Math.floor((session.endTime - session.startTime) / 1000);
    await session.save();

    // Check if the user already had a session today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingToday = await WorkoutSession.findOne({
      user: session.user,
      startTime: { $gte: today },
    });

    // Count only if this is their first session today
    if (
      !existingToday ||
      existingToday._id.toString() === session._id.toString()
    ) {
      const user = await User.findById(session.user);

      // Increment milestone progress
      user.milestoneProgress = (user.milestoneProgress || 0) + 1;

      // Check for 30-day streak
      if (user.milestoneProgress >= 30) {
        user.badges.push("30-Day Fitness Challenge");
        user.milestoneProgress = 0;
        // Optional: send motivational message
        console.log(
          `🎉 Congrats ${user.name}! You've completed a 30-Day Fitness Challenge!`
        );
      }

      await user.save();
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to end workout" });
  }
};

// (Optional) Get all sessions for a user
exports.getUserWorkouts = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await WorkoutSession.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workout sessions" });
  }
};
