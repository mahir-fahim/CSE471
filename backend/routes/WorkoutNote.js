const mongoose = require('mongoose');

const workoutNoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  },
  energyLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Hard'],
    required: true,
  },
  observation: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WorkoutNote', workoutNoteSchema);
