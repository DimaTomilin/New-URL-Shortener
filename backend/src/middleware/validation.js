const mongoose = require('mongoose');
const User = require('../models/user');

exports.validateURL = async (req, res, next) => {
  const url = req.body.url;
  try {
    const validatedURL = new URL(url);
    if (
      validatedURL.protocol === 'http:' ||
      validatedURL.protocol === 'https:'
    ) {
      req.validatedURL = validatedURL;
      next();
    } else {
      return res.status(403).send('Unknown protocol. Please try again.');
    }
  } catch (err) {
    next(err);
  }
};

exports.validateCreateUsername = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (username.length > 7 && password.length > 7) {
      const user = User.exists({ username }, (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          return res.status(403).send('This username is already exist.');
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send('Username/password invalid');
    }
  } catch (err) {
    next(err);
  }
};

exports.validateUsername = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = User.exists({ username }, (err, result) => {
      if (err) {
        throw err;
      }
      if (!result) {
        return res.status(403).send('Unknown user');
      } else {
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};
