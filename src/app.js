const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT, BODY_LIMIT } = require('./settings');
const database = require('./database');
const logger = require('./logger');

const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    limit: BODY_LIMIT,
  }),
);

app.get(['/', '/status'], (req, res) => {
  return database
    .raw('SELECT 1')
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      logger.error(
        `Failed to connect to database in ${err.address}:${err.port}`,
      );
      res.status(400).send({ message: 'Failed to connect to database.' });
    });
});

app.listen(PORT, err => {
  if (err) {
    logger.error(err.message);
    throw err;
  }
  logger.info(`Started http server on port ${PORT}.`);
});
