const URLShorten = require('../models/urlShorten');
const { randomURL } = require('../directive');

exports.createShotren = async (req, res) => {
  const username = req.user.user;
  const oldURL = req.validatedURL;
  const newURL = randomURL();
  const newShorten = await URLShorten.create({
    username: username,
    original_URL: oldURL,
    short_URL: `http://localhost:3030/${newURL}`,
    counter: 0,
  });
  res.send(newShorten);
};

exports.showStatistic = async (req, res) => {
  const username = req.user.user;
  const short_URL = req.query.url;
  const urlInformation = await URLShorten.find({ username, short_URL });
  res.send(urlInformation);
  res.end();
};
