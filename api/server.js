const express = require('express');

const server = express();
const projectsRouter = require('./projects/projectsRouter');

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);

server.get('/', async (req, res, next) => {
  try {
    res.status(200).send('<h3>Welcome to Project Tracker api</h3>')
  } catch (error) {
    next(new Error('Server not available'));
  }
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request from ${req.url}`
  );
  next();
}

function errorHandler(error, req, res, next) {
  console.error('ERROR:', error);
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

server.use(errorHandler);

module.exports = server;
