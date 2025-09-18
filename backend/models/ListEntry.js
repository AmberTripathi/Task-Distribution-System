const mongoose = require('mongoose');

const listEntrySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
        default: '',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Agent', // Reference to the Agent model
    },
}, { timestamps: true });

const ListEntry = mongoose.model('ListEntry', listEntrySchema);
module.exports = ListEntry;