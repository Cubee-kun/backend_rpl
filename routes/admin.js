const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/rbac');
const adminController = require('../controllers/adminController');

router.get('/dashboard', auth, permit('admin'), adminController.dashboard);
router.patch('/proposal/:proposalId/status', auth, permit('admin'), adminController.updateProposalStatus);

module.exports = router;
