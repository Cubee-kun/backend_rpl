const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/rbac');
const adminController = require('../controllers/adminController');

router.get('/dashboard', auth, permit('admin'), adminController.dashboard);
router.patch('/proposal/:proposalId/status', auth, permit('admin'), adminController.updateProposalStatus);

// User management routes
router.get('/users', auth, permit('admin'), adminController.getAllUsers);
router.post('/users', auth, permit('admin'), adminController.createUser);
router.put('/users/:userId', auth, permit('admin'), adminController.updateUser);
router.delete('/users/:userId', auth, permit('admin'), adminController.deleteUser);

// Proposals and reports for admin
router.get('/proposals', auth, permit('admin'), adminController.getAllProposals);
router.get('/reports', auth, permit('admin'), adminController.getAllReports);

module.exports = router;
