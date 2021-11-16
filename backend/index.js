const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const server = express();
require('dotenv').config();

const URLShorten = require('./src/models/urlShorten');

const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3030;

const {
  errorHandlerMiddleware,
  unknownEndpoint,
} = require('./src/middleware/errorHandler');
const urlRouter = require('./src/routers/urlRouter');
const userRouter = require('./src/routers/userRouter');

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

server.get('/:url', async (req, res) => {
  const url = req.params.url;
  const shorten = await URLShorten.findOne({
    short_URL: { $regex: url },
  });
  await URLShorten.updateOne(
    {
      short_URL: { $regex: url },
    },
    { counter: shorten.counter + 1 }
  );
  res.redirect(shorten.original_URL);
  res.end();
});

server.use(unknownEndpoint);

server.use(errorHandlerMiddleware);

// starting the server
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
