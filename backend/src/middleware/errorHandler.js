const fs = require('fs');
const path = require('path');
const URLShorten = require('../models/urlShorten');

//Check if this user already have shorten url to this url
exports.isURLExist = async (req, res, next) => {
  const URL = req.body.url;
  const username = req.user.user;
  try {
    const urlShorten = await URLShorten.find({
      username: username,
      original_URL: URL,
    });
    if (urlShorten.length !== 0) {
      return res.status(403).send('Shorten URL to this URl already exist.');
    }
    next();
  } catch (err) {
    return res.send(err);
  }
};

exports.unknownEndpoint = (req, res, next) => {
  // if i got to this middleware then i missed endpoint
  res.status(404).json({ error: 'Unknown endpoint' });
  next();
};

exports.errorHandlerMiddleware = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
    res.send({ error: err.message });
  } else {
    console.log(err);
    res.status(500);
    res.send({ error: 'Internal Server Error' });
  }
};
