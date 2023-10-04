const winston = require('winston');
// require('express-async-errors');
// require('winston-mongodb');

module.exports = () => {
    winston.add(new winston.transports.File( {filename: 'MAGAZINE_logs.log'} ));
    winston.exceptions.handle(new winston.transports.Console(),
    new winston.transports.File( {filename: 'MAGAZINE_logs.log'} ));

    

    // process.on("unhandledRejection", ex => {
    //     winston.error("unhandledRejection xatosi:\n" + ex.message, ex);
    // });
}