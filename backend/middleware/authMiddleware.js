const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    let token;

    // Check for the token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to the request object (excluding the password)
            req.user = await User.findById(decoded.user.id).select('-password');
            
            // Check if the user is an admin
            if (req.user && req.user.role === 'admin') {
                next(); // User is authorized, proceed to the next middleware/controller
            } else {
                res.status(403).json({ message: 'Forbidden: Not an admin' });
            }

        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = authMiddleware;