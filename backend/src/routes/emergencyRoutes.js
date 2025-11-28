const express = require('express');
const EmergencyRequest = require('../models/EmergencyRequest');
const router = express.Router();

// GET all emergency requests (SIMPLIFIED - no filters)
router.get('/', async (req, res) => {
  try {
    console.log('🔄 Fetching ALL emergency requests from database...');
    
    // Get ALL requests without any filters for testing
    const requests = await EmergencyRequest.find({}).sort({ createdAt: -1 });
    
    console.log('✅ Found emergency requests:', requests.length);
    console.log('📋 Requests:', requests);
    
    res.json(requests);
  } catch (error) {
    console.error('❌ Error fetching emergency requests:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new emergency request
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new emergency request:', req.body);
    
    const request = new EmergencyRequest(req.body);
    const savedRequest = await request.save();
    
    console.log('✅ Emergency request created successfully:', savedRequest._id);
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('❌ Error creating emergency request:', error);
    res.status(400).json({ message: error.message });
  }
});

// UPDATE request status
router.patch('/:id', async (req, res) => {
  try {
    const request = await EmergencyRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;