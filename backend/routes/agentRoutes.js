const express = require('express');
const router = express.Router();
const { createAgent, getAgents } = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');

// We apply the authMiddleware to all routes in this file
// This ensures only an authenticated admin can access them
router.route('/').post(authMiddleware, createAgent).get(authMiddleware, getAgents);

module.exports = router;