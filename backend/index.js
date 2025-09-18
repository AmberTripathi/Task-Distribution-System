// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const listRoutes = require('./routes/listRoutes'); // Import list routes

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes); // Use the list routes

// --- Basic Route ---
app.get('/', (req, res) => {
    res.send('MERN Agent App API is running!');
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});