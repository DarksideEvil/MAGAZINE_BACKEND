const express = require('express');
const app = express();
const cors = require('cors');
// const appRouter = require('./src/router');
// const paymentRouter = require('./src/payments/payment');
require('dotenv').config();
require('./setting/logs/log')();
require('./setting/DB/db')();

app.use(express.json());
app.use(cors());
// app.use('/api', appRouter);
// app.use('/api', paymentRouter);

app.use((err, req, res, next) => {
    if (err) {
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
app.listen(PORT, () => console.log(`${PORT} server's alive...`));