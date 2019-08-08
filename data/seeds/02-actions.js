
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        { description: 'Get it', notes: 'Some notes', project_id: 1 },
        { description: 'Hope', notes: 'Pope', project_id: 1 },
        { description: 'King', notes: 'Lets do this', project_id: 1 },
        { description: 'Just', notes: 'Yah!', project_id: 2 },
        { description: 'So', notes: 'Boom', project_id: 2 },
        { description: 'Know it', notes: 'Love', project_id: 3 },
        { description: 'Haba', notes: 'Great', project_id: 3 },
        { description: 'Gone', notes: 'Awesome', project_id: 4 },
        { description: 'Power', notes: 'Super', project_id: 4 },
      ]);
    });
};
