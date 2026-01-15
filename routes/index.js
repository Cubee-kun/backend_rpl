const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/proposals', require('./proposals'));
router.use('/reports', require('./reports'));
router.use('/admin', require('./admin'));

module.exports = router;
