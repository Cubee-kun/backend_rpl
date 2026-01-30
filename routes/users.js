const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/rbac');
const userController = require('../controllers/userController');

// Admin only routes
router.get('/', auth, permit('admin'), userController.listUsers);
router.post('/', auth, permit('admin'), userController.createUser);
router.put('/:id', auth, permit('admin'), userController.updateUser);
router.delete('/:id', auth, permit('admin'), userController.deleteUser);

module.exports = router;