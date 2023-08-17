const express = require('express');
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Shorten a URL
router.post('/shorten', authMiddleware.isAuthenticated, urlController.shortenURL);

// Get all URLs for the logged-in user
router.get('/urls', authMiddleware.isAuthenticated, urlController.getUserURLs);

module.exports = router;
