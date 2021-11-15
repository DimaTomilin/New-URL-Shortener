const mongoose = require('mongoose');

const URLShorten = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    original_URL: { type: String, trim: true, required: true },
    short_URL: { type: String, trim: true, required: true },
    counter: { type: Number, trim: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('URLShorten', URLShorten);
