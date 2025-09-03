const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with proper awaiting
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return true;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      maxPoolSize: 1
    });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const connected = await connectDB();
      if (!connected) {
        return res.status(500).json({ 
          success: false, 
          message: 'Database connection failed' 
        });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection error' 
    });
  }
});

// Initial connection
if (process.env.MONGODB_URI) {
  connectDB();
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: process.env.MONGODB_URI ? 'Connected' : 'Missing'
  });
});

// API Routes
app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/patients', require('../src/routes/patients'));
app.use('/api/practitioners', require('../src/routes/practitioners'));
app.use('/api/bookings', require('../src/routes/bookings'));
app.use('/api/therapies', require('../src/routes/therapies'));
app.use('/api/notifications', require('../src/routes/notifications'));
app.use('/api/admin', require('../src/routes/admin'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

module.exports = app;