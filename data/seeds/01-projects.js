
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { name: 'Mop the floor', description: 'Hard work' },
        { name: 'File taxes', description: 'Feed government' },
        { name: 'Buy pig feed', description: 'Feed pigs' },
        { name: 'Pay employees', description: 'Money matter' },
        { name: 'Sell pigs', description: 'Matter in' },
      ]);
    });
};
