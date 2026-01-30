const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const rbac = require('../middlewares/rbac');
const proposalController = require('../controllers/proposalController');

router.post('/', auth, rbac('organisasi'), proposalController.createProposal);
router.get('/me', auth, proposalController.listUserProposals);

// Admin routes - both endpoints for flexibility
router.get('/', auth, rbac('admin'), proposalController.listAllProposals);
router.get('/all', auth, rbac('admin'), proposalController.listAllProposals);
router.put('/:id/status', auth, rbac('admin'), proposalController.updateProposalStatus);

module.exports = router;
