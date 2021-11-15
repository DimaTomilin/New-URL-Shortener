const fs = require('fs');
const path = require('path');
const URLShorten = require('../models/urlShorten');

//Check if this user already have shorten url to this url
async function isURLExist(req, res, next) {
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
}

function serverError(error, req, res, next) {
  res.status(500);
  res.send('Oops, something went wrong.');
  res.end();
}

module.exports = {
  isURLExist,
  serverError,
};
