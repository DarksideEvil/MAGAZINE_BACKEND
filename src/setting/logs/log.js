const winston = require('winston');

module.exports = () => {
    winston.add(new winston.transports.File( {filename: 'MAGAZINE_logs.log'} ));
    winston.exceptions.handle(new winston.transports.Console(),
    new winston.transports.File( {filename: 'MAGAZINE_logs.log'} ));
}