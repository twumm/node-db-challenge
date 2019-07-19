
exports.up = function (knex) {
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
    .createTable('contexts', table => {
      table.increments();
      table.text('context')
        .notNullable();
    })
    .createTable('action_contexts', table => {
      table.increments();
      table.integer('action_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('actions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('context_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('context')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('action_contexts')
    .dropTableIfExists('context')
    .dropTableIfExists('actions')
    .dropTableIfExists('projects')
};
