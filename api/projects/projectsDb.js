const db = require('../../data/dbConfig');

function getAllProjects() {
  return db('projects')
    .join('actions', 'actions.project_id', 'projects.id');
}

function getProject(id) {
  return db('projects')
    .where({ id });
}

function addProject(project) {
  return db('projects')
    .insert(project)
    .then(ids => getProject(ids[0]));
}

function updateProject(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes);
}

function removeProject(id) {
  return db('projects')
    .where({ id })
    .del();
}

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  removeProject,
};
