
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', table => {
      table.increments();
      table.text('name')
        .notNullable();
      table.text('description');
      table.boolean('completed')
        .defaultTo(false);
    })
    .createTable('actions', table => {
      table.increments();
      table.text('description')
        .notNullable();
      table.text('notes');
      table.boolean('completed')
        .defaultTo(false);
      table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects')
};
