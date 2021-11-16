const User = require('../models/user');
const URLShorten = require('../models/urlShorten');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secret = process.env.ACCESS_TOKEN_SECRET;

exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(
    password,
    Number(process.env.SaltRounds),
    async function (err, hash) {
      if (hash) {
        try {
          const newUser = await User.create({
            username: username,
            hash: hash,
            // ip: req.uaData.ip,
            // operatingSystem: req.uaData.os?.name,
            // browser: req.uaData.browser?.name,
          });
          res.send(newUser);
        } catch (error) {
          res.send(error);
        }
      } else {
        res.send(err);
      }
    }
  );
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = jwt.sign({ user: username }, secret);
    const person = await User.findOne({ username });
    bcrypt.compare(password, person.hash, function (err, result) {
      // if passwords match
      if (result) {
        res.cookie('token', token, { maxAge: 1200000 });
        res.send(`It matches! Hi ${username}.`);
        console.log('It matches!');
      }
      // if passwords do not match
      else {
        console.log('Invalid password!');
        return res.status(401).send('Invalid password!');
      }
    });
  } catch (err) {
    res.send(err);
  }
};

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.checkUser = (req, res) => {
  const user = req.user;
  res.send(`Hi. Current user is ${user.user} `);
};

exports.logOut = (req, res) => {
  res.cookie('token', 'deleted');
  res.send('Logged out.');
};

exports.showAll = async (req, res) => {
  const username = req.user.user;
  const shortens = await URLShorten.find({ username });
  if (shortens.length === 0) {
    res.status(404).send('This user doesn`t have url-shortens');
  }
  res.send(shortens.reverse());
};
