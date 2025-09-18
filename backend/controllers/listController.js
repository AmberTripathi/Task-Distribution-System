const multer = require('multer');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const streamifier = require('streamifier');
const Agent = require('../models/Agent');
const ListEntry = require('../models/ListEntry');

// --- Multer Configuration for file upload ---
const storage = multer.memoryStorage(); // Store file in memory

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'text/csv', 
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only CSV and XLSX files are allowed.'), false);
    }
};

exports.upload = multer({ storage, fileFilter });

// --- Controller to handle the upload and distribution ---
// @desc    Upload a list and distribute it
// @route   POST /api/lists/upload
// @access  Private/Admin
exports.uploadList = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file.' });
    }

    try {
        // --- 1. Fetch the first 5 agents ---
        // As per requirement to distribute among 5 agents
        const agents = await Agent.find().limit(5).select('_id');
        if (agents.length === 0) {
            return res.status(400).json({ message: 'No agents available for distribution.' });
        }

        // --- 2. Parse the uploaded file ---
        let results = [];
        const fileBuffer = req.file.buffer;

        if (req.file.mimetype === 'text/csv') {
            const stream = streamifier.createReadStream(fileBuffer);
            await new Promise((resolve, reject) => {
                stream.pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', resolve)
                    .on('error', reject);
            });
        } else { // It's an XLSX file
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            results = xlsx.utils.sheet_to_json(worksheet);
        }
        
        // --- 3. Validate parsed data format ---
        if (results.length === 0 || !results[0].FirstName || !results[0].Phone) {
            return res.status(400).json({ message: 'Invalid file format. Ensure columns are named: FirstName, Phone, Notes' });
        }

        // --- 4. Distribute the list entries among agents ---
        const totalEntries = results.length;
        const numAgents = agents.length;
        const entriesToSave = [];
        let agentIndex = 0;

        for (const item of results) {
            const entry = {
                firstName: item.FirstName,
                phone: item.Phone,
                notes: item.Notes || '',
                assignedTo: agents[agentIndex]._id,
            };
            entriesToSave.push(entry);

            // Move to the next agent in a round-robin fashion
            agentIndex = (agentIndex + 1) % numAgents;
        }

        // --- 5. Save the distributed entries to the database ---
        await ListEntry.insertMany(entriesToSave);
        
        res.status(201).json({ 
            message: `${totalEntries} entries successfully uploaded and distributed among ${numAgents} agents.` 
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during file processing.', error: error.message });
    }
};


// @desc    Get all distributed list entries
// @route   GET /api/lists
// @access  Private/Admin
exports.getLists = async (req, res) => {
    try {
        const lists = await ListEntry.find({}).populate('assignedTo', 'name email');
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};