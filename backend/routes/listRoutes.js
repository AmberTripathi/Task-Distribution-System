const express = require('express');
const router = express.Router();
const { upload, uploadList, getLists } = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware');

// The upload.single('file') middleware from multer will process the file upload
// The 'file' string must match the field name in the form-data from the client
router.post('/upload', authMiddleware, upload.single('file'), uploadList);

router.get('/', authMiddleware, getLists);

module.exports = router;