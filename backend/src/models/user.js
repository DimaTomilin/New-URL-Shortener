const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    hash: { type: String, trim: true, required: true },
    ip: { type: String, trim: true, required: true },
    operatingSystem: { type: String, trim: true, required: true },
    browser: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
