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
const {
  validateCreateUsername,
  validateUsername,
} = require('../middleware/validation');

// creating a user
router.put('/create', validateCreateUsername, createUser);

router.post('/signin', validateUsername, signIn);

router.use(authenticateToken);
//get message which user I use at the moment
router.get('/info', checkUser);

router.delete('/logout', logOut);

//get list of all shorten urls
router.get('/all', showAll);

module.exports = router;
