const settings = require('./settings');

module.exports = require('knex')({
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
