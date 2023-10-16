const router = require('express').Router();

const {
    addDress,
    getDresses,
    getDress,
    editDress,
    deleteDress
} = require('./dress.controller');

const {
    addDressValidate,
    getDressValidate,
    editDressValidate,
    deleteDressValidate
} = require('./dress.validation');

const { verifyToken } = require('../util/auth');

router.route('/').get(getDresses);

router.route('/:id').get(getDressValidate, getDress);

router.use(verifyToken);

router.route('/').post(addDressValidate, addDress);

router.route('/:id').put(editDressValidate, editDress);

router.route('/:id').delete(deleteDressValidate, deleteDress);

module.exports = router;