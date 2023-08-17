const mongoose = require('mongoose');

const urlMappingSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const URLMapping = mongoose.model('URLMapping', urlMappingSchema);

module.exports = URLMapping;
