const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true, required: true },
    hash: { type: String, trim: true, required: true },
    ip: { type: String, trim: true },
    operatingSystem: { type: String, trim: true },
    browser: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
