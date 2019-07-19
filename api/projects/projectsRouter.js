const express = require('express');

const router = express.Router();
const projectsDb = require('./projectsDb');

router.get('/', async (req, res, next) => {
  try {
    const projects = await projectsDb.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(new Error('Cannot get projects'));
  }
})

module.exports = router;
