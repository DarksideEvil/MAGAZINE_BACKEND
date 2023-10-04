const winston = require('winston');

const logger = winston.createLogger({
    transports: new winston.transports.File({filename: 'MAGAZINE_logs.log'}, 
    new winston.transports.Console())
});

const logError = (err) => {
    logger.error(err);
};

module.exports = { logError }