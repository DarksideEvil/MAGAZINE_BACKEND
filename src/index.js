const express = require('express');
const app = express();
const cors = require('cors');
const appRouter = require('./router');
const paymentRouter = require('./payments/payment');
const { logError } = require('./setting/logs/extraLogger');
const dotenv = require('dotenv');
const log = require('./setting/logs/log');
const db = require('./setting/DB/db');

dotenv.config();
//err handling and writing to journal...
log();
//connecting database...
db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', appRouter);
app.use('/api', paymentRouter);

//err handling...
app.use((err, req, res, next) => {
    if (err) {
      logError(err)
      console.error(err.message)
      if (!err.statusCode) {err.statusCode = 500} // Set 500 server code error if statuscode not set
      return res.status(err.statusCode).send({
        statusCode: err.statusCode,
        message: err.details.body[0].message
      });
    }
    next();
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => console.log(`${PORT} server's alive...`));