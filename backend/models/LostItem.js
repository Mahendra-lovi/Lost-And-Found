const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  description: String,
  dateLost: {
    type: Date,
    default: Date.now,
  },
  location: String,
  contactInfo: String,
});

module.exports = mongoose.model('LostItem', LostItemSchema);
