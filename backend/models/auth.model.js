// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  healthPlan: {
    type: String,
    default: 'Basic',
    enum: ['Basic', 'Standard', 'Premium', 'Custom']
  },
 privacy:{
    type:  Boolean,
    default: false
 }
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
