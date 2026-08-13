const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../auth');

// Public auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected profile routes
router.put('/profile', authenticate, authController.updateProfile);
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;
