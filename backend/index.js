const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const server = express();
require('dotenv').config();

const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3030;

const { serverError } = require('./src/middleware/errorHandler');
const urlRouter = require('./src/routers/urlRouter');
const userRouter = require('./src/routers/userRouter');
const { findFile } = require('./src/directive');

server.use(express.json());
server.use(cookieParser());
server.use(cors());

// server.use('/', express.static('../dist')); // serve main path as static dir
// server.get('/', function (req, res) {
//   // serve main path as static file
//   res.sendFile('../dist/index.html');
// });
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});
server.use(
  morgan(' :method :url :status :res[content-length] - :response-time ms :body')
);

//connecting to database
mongoose
  .connect(process.env.DATABASE)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

server.use('/user', userRouter);
server.use('/url', urlRouter);

server.get('/:url', (req, res) => {
  const url = req.params.url;
  const longURL = findFile(url);
  res.redirect(longURL);
  res.end();
});

server.use(serverError);

// starting the server
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
