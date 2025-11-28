const express = require('express');
const Donor = require('../models/Donor');
const router = express.Router();

let requestCount = 0;

// GET all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find();
    
    // Log only every 10th request to reduce noise
    requestCount++;
    if (requestCount % 10 === 0) {
      console.log('📊 Auto-refresh check - Donors:', donors.length);
    }
    
    res.json(donors);
  } catch (error) {
    console.error('❌ Error fetching donors:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new donor
router.post('/', async (req, res) => {
  try {
    console.log('🎯 NEW DONOR REGISTRATION:', req.body.name);
    const donor = new Donor(req.body);
    const savedDonor = await donor.save();
    res.status(201).json(savedDonor);
  } catch (error) {
    console.error('❌ Error creating donor:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;