const validUrl = require('valid-url');
const shortid = require('shortid');
const URLMapping = require('../models/URLMapping');
const User = require('../models/User');

const urlController = {};

// Shorten a URL
urlController.shortenURL = async (req, res) => {
  try {
    const { longUrl } = req.body;

    // Check if the URL is valid
    if (!validUrl.isUri(longUrl)) {
      return res.status(400).json({ message: 'Invalid URL' });
    }

    // Generate a short code
    const shortCode = shortid.generate();

    // Create a new URL mapping
    const newURLMapping = new URLMapping({
      longUrl,
      shortCode,
      user: req.user._id, // Assuming you have user authentication middleware
    });

    await newURLMapping.save();

    res.status(201).json({ shortUrl: `/${shortCode}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user's URL mappings
urlController.getUserURLs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('urls');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ urls: user.urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = urlController;
