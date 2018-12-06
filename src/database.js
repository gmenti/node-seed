const logger = require('./logger');
const settings = require('./settings');

const database = require('knex')({
  client: 'mysql2',
  connection: {
    host: settings.DB_HOST,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_DATABASE,
    typeCast: (field, next) => {
      switch (field.type) {
        case 'TINY': {
          return field.string() === '1';
        }
      }
      return next();
    },
  },
  pool: {
    min: settings.DB_POOL_MIN,
    max: settings.DB_POOL_MAX,
  },
  migrations: {
    tableName: 'migrations',
  },
});

database.on('query', query => {
  let sql = query.sql;
  query.bindings.forEach(binding => {
    sql = sql.replace('?', binding);
  });
  logger.info(sql);
});

database.addCreatedAt = table =>
  table
    .timestamp('createdAt')
    .notNullable()
    .defaultTo(database.fn.now());

database.addUpdatedAt = table =>
  table
    .timestamp('updatedAt')
    .defaultTo(database.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

module.exports = database;
