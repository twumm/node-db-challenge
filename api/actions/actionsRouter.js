const express = require('express');

const router = express.Router();
const actionsDb = require('./actionsDb');

router.get('/', async (req, res, next) => {
  try {
    const actions = await actionsDb.getAllActions();
    res.status(200).json(actions);
  } catch (error) {
    next(new Error('Cannot get actions'));
  }
})

router.get('/:id', validateActionId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await actionsDb.getAction(id);
    res.status(200).json(action);
  } catch (error) {
    next(new Error('Cannot get action'));
  }
})

// custom middlewares
async function validateActionId(req, res, next) {
  const { id } = req.params;
  const action = await actionsDb.getAction(id);
  if (action) {
    req.action = action;
    next()
  } else {
    next(new Error('Invalid action id'))
  }
}

module.exports = router;
