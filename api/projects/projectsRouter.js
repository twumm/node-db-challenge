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

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await projectsDb.getProject(id);
    res.status(200).json(project);
  } catch (error) {
    next(new Error('Cannot get project'));
  }
})

router.post('/', async (req, res, next) => {
  const project = { name, description } = req.body;
  try {
    const newProject = await projectsDb.addProject(project);
    res.status(201).json(newProject);
  } catch (error) {
    next(new Error('Cannot create project'));
  }
})

module.exports = router;
