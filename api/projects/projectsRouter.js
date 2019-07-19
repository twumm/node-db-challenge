const express = require('express');

const router = express.Router();
const projectsDb = require('./projectsDb');
const actionsDb = require('../actions/actionsDb');

router.get('/', async (req, res, next) => {
  try {
    const projects = await projectsDb.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(new Error('Cannot get projects'));
  }
})

router.get('/:id', validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await projectsDb.getProject(id);
    res.status(200).json(project);
  } catch (error) {
    next(new Error('Cannot get project'));
  }
})

router.post('/', validationProjectContent, async (req, res, next) => {
  const project = { name, description } = req.body;
  try {
    const newProject = await projectsDb.addProject(project);
    res.status(201).json(newProject);
  } catch (error) {
    next(new Error('Cannot create project'));
  }
})

router.post('/:id/action', [validateProjectId, validationActionContent] async (req, res, next) => {
  const { id } = req.params;
  const action = { description, notes } = req.body;
  try {
    const newAction = await actionsDb.addAction(id, action);
    res.status(201).json(newAction);
  } catch (error) {
    next(new Error('Cannot create action'));
  }
})

// custom middlewares
async function validateProjectId(req, res, next) {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'User id must be a number' })
  }
  const project = await projectDb.get(id);
  if (project) {
    req.project = project;
    next();
  } else {
    res.status(400).json({ message: "Invalid project id" });
  }
}

function validationProjectContent(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required *name* and *description* fields" });
  } else {
    next();
  }
}

function validationActionContent(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Missing required *description* and *notes* fields" });
  } else {
    next();
  }
}

module.exports = router;
