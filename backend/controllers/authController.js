const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new admin user
// @route   POST /api/auth/register
// @access  Public
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if an admin already exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            return res.status(400).json({ message: 'An admin account already exists.' });
        }

        // Create a new user instance
        const user = new User({ name, email, password });

        // Save the user to the database (password will be hashed by the pre-save middleware)
        await user.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT Payload
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        // Sign the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};