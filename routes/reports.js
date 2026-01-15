const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const reportController = require('../controllers/reportController');

// Expect fields: reportFile, buktiFile
router.post('/upload', auth, upload.fields([{ name: 'reportFile' }, { name: 'buktiFile' }]), reportController.uploadLPJ);

module.exports = router;
