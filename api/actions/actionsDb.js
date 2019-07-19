const db = require('../../data/dbConfig');
const mappers = require('../mappers');

function getAllActions() {
  return db('actions');
}

function getAction(id) {
  let query = db('actions')

  if (id) {
    query.where('actions.id', id).first();

    const promises = [query, this.getActionContexts(id)];

    return Promise.all(promises).then(function(results) {
      let [action, contexts] = results;

      if (action) {
        action.contexts = contexts;

        return mappers.actionToBody(action);
      } else {
        return null
      }
    })
  }

  return query.then(actions => {
    return actions.map(action => mappers.actionToBody(action))
  })
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

function getActionContexts(actionId) {
  return db('actions')
    .leftJoin('action_contexts', 'action_contexts.action_id', 'actions.id')
    .leftJoin('contexts', 'contexts.id', 'action_contexts.context_id')
    .where('action_id', actionId)
    .then(contexts => contexts.map(context => mappers.actionToBody(context)))
}

module.exports = {
  getAllActions,
  getAction,
  addAction,
  updateAction,
  removeAction,
  getActionContexts,
};
