const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema({
  // Patient Information
  patientName: {
    type: String,
    required: false
  },
  patientAge: {
    type: Number,
    required: false
  },
  reason: {
    type: String,
    required: true
  },
  
  // Blood Requirements
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  unitsRequired: {
    type: Number,
    required: true,
    min: 1
  },
  requiredBy: {
    type: Date,
    required: true
  },
  
  // Hospital Details
  hospital: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: false
  },
  bedNumber: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  mapLink: {
    type: String,
    required: false
  },
  
  // Contact Information
  contactPerson: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  alternateNumber: {
    type: String,
    required: false
  },
  relationToPatient: {
    type: String,
    required: false
  },
  
  // Status
  urgencyLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Active', 'Fulfilled', 'Expired'],
    default: 'Active'
  },
  donorsResponded: {
    type: Number,
    default: 0
  },
  
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);