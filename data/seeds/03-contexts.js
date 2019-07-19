
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contexts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contexts').insert([
        { context: 'at home' },
        { context: 'at work' },
        { context: 'at church' },
        { context: 'at school' },
        { context: 'at hospital' },
        { context: 'online' },
      ]);
    });
};
