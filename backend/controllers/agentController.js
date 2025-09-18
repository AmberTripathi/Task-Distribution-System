const Agent = require('../models/Agent');

// @desc    Create a new agent
// @route   POST /api/agents
// @access  Private/Admin
exports.createAgent = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        const agentExists = await Agent.findOne({ email });

        if (agentExists) {
            return res.status(400).json({ message: 'Agent with this email already exists' });
        }

        const agent = new Agent({
            name,
            email,
            mobile,
            password,
        });

        const createdAgent = await agent.save();
        
        // Respond with created agent data (excluding password)
        res.status(201).json({
            _id: createdAgent._id,
            name: createdAgent.name,
            email: createdAgent.email,
            mobile: createdAgent.mobile,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all agents
// @route   GET /api/agents
// @access  Private/Admin
exports.getAgents = async (req, res) => {
    try {
        // Find all agents and exclude their passwords from the result
        const agents = await Agent.find({}).select('-password');
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};