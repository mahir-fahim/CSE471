const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number } // in seconds (optional, calculated when ending)
}, { timestamps: true });

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);
