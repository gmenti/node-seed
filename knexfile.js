const settings = require('./src/settings');

module.exports = {
  client: 'mysql2',
  connection: {
    host: settings.DB_HOST,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_DATABASE,
  },
  pool: {
    min: settings.DB_POOL_MIN,
    max: settings.DB_POOL_MAX,
  },
  migrations: {
    tableName: 'migrations',
  },
};
