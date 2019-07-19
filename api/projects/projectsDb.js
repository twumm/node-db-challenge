const db = require('../../data/dbConfig');
const mappers = require('../mappers');

function getAllProjects() {
  return db('projects')
}

function getProject(id) {
  let query = db('projects')

  if (id) {
    query.where('projects.id', id).first();

    const promises = [query, this.getProjectActions(id)];

    return Promise.all(promises).then(function(results) {
      let [project, actions] = results;

      if (project) {
        project.actions = actions;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  }

  return query.then(projects => {
    return projects.map(project => mappers.projectToBody(project));
  })
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

function getProjectActions(projectId) {
  return db('actions')
    .where('project_id', projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  removeProject,
  getProjectActions
};
