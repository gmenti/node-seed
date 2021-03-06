const database = require('../src/database');

exports.up = function(knex) {
  return database.schema.createTable('users', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('fullName').notNullable();
    table.string('document').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table
      .bigInteger('balance')
      .unsigned()
      .defaultTo(0);
    table.boolean('isAdmin').defaultTo(false);
    table.boolean('disabled').defaultTo(false);
    table.boolean('deleted').defaultTo(false);
    database.addCreatedAt(table);
    database.addUpdatedAt(table);
    table.timestamp('deletedAt');
    table.unique(['email', 'deleted']);
  });
};

exports.down = function() {
  return database.schema.dropTableIfExists('users');
};
