const fs = require('fs');
const express = require('express');
const router = express.Router();
const isUser = require('../middleware/userHandler');
const { isURLExist } = require('../middleware/errorHandler');
const { randomURL, createURLFile } = require('../directive');
const { createShotren } = require('../controllers/urlShorten');
const { authenticateToken } = require('../controllers/user');

// user middleware error handler
router.use(authenticateToken);

router.put('/create', isURLExist, createShotren);

// router.put('/create', isURLExist, (req, res) => {
//   const username = req.headers.username;
//   const oldURL = req.body.url;
//   const newURL = randomURL();
//   createURLFile(oldURL, newURL, username);
//   res.json({ newURL });
//   res.end();
// });

router.get('/statistic', isUser, (req, res) => {
  const username = req.headers.username;
  const url = req.query.url;
  const urlInformation = JSON.parse(
    fs.readFileSync(`./backend/users/${username}/${url}.json`)
  );
  res.json(urlInformation);
  res.end();
});

module.exports = router;
