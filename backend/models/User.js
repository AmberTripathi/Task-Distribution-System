const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Each email must be unique
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin', // Default role for any user created through this model
    },
}, { timestamps: true });

// Middleware to hash password before saving the user document
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;