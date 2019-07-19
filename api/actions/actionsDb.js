const db = require('../../data/dbConfig');

function getAllActions() {
  return db('actions');
}

function getAction(id) {
  return db('actions')
    .where({ id });
}

function addAction(projectId, action) {
  return db('actions')
    .insert({
      project_id: projectId,
      description: action.description,
      notes: action.notes
    })
    .then(ids => getAction(ids[0]));
}

function updateAction(id, changes) {
  return db('actions')
    .where({ id })
    .update(changes);
}

function removeAction(id) {
  return db('actions')
    .where({ id })
    .del();
}

module.exports = {
  getAllActions,
  getAction,
  addAction,
  updateAction,
  removeAction,
};
