const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blood-donation-system')
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Routes with logging
app.use('/api/donors', require('./src/routes/donorRoutes'));
app.use('/api/emergency', require('./src/routes/emergencyRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Blood Donation System API is running!' });
});

// Log all API requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
  console.log(`🩸 Donors API: http://localhost:${PORT}/api/donors`);
  console.log(`🚨 Emergency API: http://localhost:${PORT}/api/emergency`);
});