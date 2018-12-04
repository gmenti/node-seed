require('dotenv').config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY,
  BODY_LIMIT: process.env.BODY_LIMIT,
  PORT: parseInt(process.env.PORT) || 3000,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_POOL_MIN: parseInt(process.env.DB_POOL_MIN),
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX),
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
