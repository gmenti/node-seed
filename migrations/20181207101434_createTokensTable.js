const database = require('../src/database');

exports.up = function(knex) {
  return database.schema.createTable('tokens', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users');
    table.string('hash').notNullable();
    database.addCreatedAt(table);
    table.timestamp('deletedAt');
    table.boolean('deleted').defaultTo(false);
    table.unique(['hash', 'deleted']);
    table.unique(['userId', 'deleted']);
  });
};

exports.down = function() {
  return database.schema.dropTableIfExists('tokens');
};
