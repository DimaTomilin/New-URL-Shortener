const express = require('express');
const router = express.Router();
const {
  createUser,
  signIn,
  authenticateToken,
  checkUser,
  logOut,
  showAll,
} = require('../controllers/user');
const { validateUsername } = require('../middleware/validation');

// creating a user
router.put('/create', validateUsername, createUser);

router.post('/signin', signIn);

router.use(authenticateToken);
//get message which user I use at the moment
router.get('/info', checkUser);

router.delete('/logout', logOut);

//get list of all shorten urls
router.get('/all', showAll);

module.exports = router;
