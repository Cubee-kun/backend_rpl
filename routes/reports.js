const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const reportController = require('../controllers/reportController');
const rbac = require('../middlewares/rbac');

// Get reports
router.get('/me', auth, reportController.getUserReports);
router.get('/', auth, rbac(['admin']), reportController.getAllReports);

// Expect fields: reportFile, buktiFile
router.post('/upload', auth, upload.fields([{ name: 'reportFile' }, { name: 'buktiFile' }]), reportController.uploadLPJ);

module.exports = router;
