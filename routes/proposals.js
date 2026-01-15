const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/rbac');
const proposalController = require('../controllers/proposalController');

router.post('/', auth, permit('organisasi','admin'), proposalController.createProposal);
router.get('/me', auth, proposalController.listUserProposals);

module.exports = router;
