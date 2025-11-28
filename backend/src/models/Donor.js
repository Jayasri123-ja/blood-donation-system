const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  lastDonationDate: {
    type: Date
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  healthInfo: {
    weight: Number,
    height: String,
    hasDiseases: { type: Boolean, default: false },
    diseaseDetails: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donor', donorSchema);