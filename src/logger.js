const winston = require('winston');
const moment = require('moment-timezone');
const { combine, splat, colorize, timestamp, printf } = winston.format;

const customFormat = printf(info => {
  return `[${moment(info.timestamp)
    .utc()
    .format('YYYY-MM-DD HH:mm:ss')}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(splat(), timestamp(), colorize(), customFormat),
  transports: [new winston.transports.Console({})],
});

module.exports = logger;
