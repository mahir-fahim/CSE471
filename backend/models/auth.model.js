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
  height: {
    type: Number, // in cm or inches — your choice
    required: false,
    min: 0
  },
  weight: {
    type: Number, // in kg or pounds
    required: false,
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
  privacy: {
    type: Boolean,
    default: false
<<<<<<< HEAD
  },
  role: {
    type: String,
    enum: ['member', 'admin', 'trainer','receptionist'],
    default: 'member'
  },  
=======
  }
>>>>>>> 42921392ffcf93c4a932bacaa52adb4830066f91
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
