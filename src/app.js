const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const url = require('url');
const { PORT, BODY_LIMIT } = require('./settings');
const database = require('./database');
const logger = require('./logger');

const app = express();
app.use(helmet());
app.use(cors());
app.use(
  bodyParser.json({
    limit: BODY_LIMIT,
  }),
);

app.get(['/', '/status'], async (req, res, next) => {
  try {
    await database.raw('SELECT 1');
  } catch (err) {
    next(err);
  }
});

app.use('/users', require('./http/routes/usersRoute'));

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  let code = 500;
  const data = {};
  if (err.sqlState) {
    data.message = err.sqlMessage;
  } else if (err.isJoi) {
    code = 422;
    data.message = 'Validation failed';
    data.details = err.details;
  } else {
    console.log(err);
    data.message = err.message;
  }
  console.log(code);
  res.status(code).send(data);
  logger.error(data.message);
});

app.listen(PORT, err => {
  if (err) {
    logger.error(err.message);
    throw err;
  }
  logger.info(`Started http server on port ${PORT}.`);
});
