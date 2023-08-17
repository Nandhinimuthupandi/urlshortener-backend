const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// Register new user
router.post('/register', authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

// Logout user
router.get('/logout', authController.logout);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;

