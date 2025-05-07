// backend/models/UserActivity.js
const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  habits: [{ type: String }],
  challenges: [{ type: String }],
  notifications: [{ type: String }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserActivity', userActivitySchema);
