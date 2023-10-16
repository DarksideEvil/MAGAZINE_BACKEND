const router = require('express').Router();

const {
    userAuth,
    adminAuth,
    bossAuth
} = require('./auth.controller');

router.route('/').post(userAuth);

router.route('/admin').post(adminAuth);

router.route('/boss').post(bossAuth);

module.exports = router;