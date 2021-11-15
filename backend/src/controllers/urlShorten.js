const URLShorten = require('../models/urlShorten');
const { randomURL } = require('../directive');

exports.createShotren = async (req, res) => {
  const username = req.user.user;
  const oldURL = req.body.url;
  const newURL = randomURL();
  const newShorten = await URLShorten.create({
    username: username,
    original_URL: oldURL,
    short_URL: `http://localhost:3030/${newURL}`,
    counter: 0,
  });
  res.send(newShorten);
};
