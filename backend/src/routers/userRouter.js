const express = require('express');
const router = express.Router();
const fs = require('fs');
const isUser = require('../middleware/userHandler');
const { readFiles } = require('../directive');
const {
  createUser,
  signIn,
  authenticateToken,
  checkUser,
  logOut,
  showAll,
} = require('../controllers/user');

// creating a user
router.put('/create', createUser);

router.post('/signin', signIn);

//get message which user I use at the moment
router.get('/info', authenticateToken, checkUser);

router.delete('/logout', authenticateToken, logOut);

//get list of all shorten urls
router.get('/all', authenticateToken, showAll);
// router.get('/all', isUser, (req, res) => {
//   const username = req.headers.username;
//   const allUserURL = readFiles(`./backend/users/${user}`);
//   res.json(allUserURL);
//   res.end();
// });

module.exports = router;
