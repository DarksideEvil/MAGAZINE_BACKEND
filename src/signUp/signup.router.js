const router = require('express').Router();
const signUp = require('./signup.controller');

router.route('/').post(signUp);

module.exports = router;