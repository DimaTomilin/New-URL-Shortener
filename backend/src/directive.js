const fs = require('fs');
const shortid = require('shortid');
const URLShorten = require('./models/urlShorten');

//Check if this shorten id been used before
function urlCheck(url) {
  URLShorten.exists({ short_URL: { $regex: { url } } }, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      return result;
    }
  });
}

//Generate random short url
function randomURL() {
  const randomURL = shortid.generate();
  if (urlCheck(randomURL)) {
    return randomURL();
  }
  return randomURL;
}

module.exports = {
  randomURL,
};
