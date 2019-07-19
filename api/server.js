const express = require('express');

const server = express();

server.use(express.json());

server.get('/', async (req, res, next) => {
  try {
    res.status(200).send('<h3>Welcome to Project Tracker api</h3>')
  } catch (error) {
    next();
  }
})

module.exports = server;
