const router = require('express').Router();

const bookRouter = require('./book/book.router');
const dressRouter = require('./dress/dress.router');
const electronicRouter = require('./electronic/gadget.router');
const foodRouter = require('./food/food.router');
const userRouter = require('./user/user.router');
const userAuthRouter = require('./auth/auth.router');
const signUpRouter = require('./signUp/signup.router');
const reportRouter = require('./reports/report.router');
const paymentRouter = require('./payments/payment.js');

router.use('/books', bookRouter);
router.use('/dresses', dressRouter);
router.use('/electronics', electronicRouter);
router.use('/foods', foodRouter);
router.use('/users', userRouter);
router.use('/auth', userAuthRouter);
router.use('/signup', signUpRouter);
router.use('/reports', reportRouter);
router.use('/checkout', paymentRouter);

module.exports = router;