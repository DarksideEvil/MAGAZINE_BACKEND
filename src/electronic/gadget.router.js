const router = require('express').Router();

const {
    addElectronic,
    getElectronics,
    getElectronic,
    editElectronic,
    deleteElectronic
} = require('./gadget.controller');

const {
    addElectronicValidate,
    getElectronicValidate,
    editElectronicValidate,
    deleteElectronicValidate
} = require('./gadget.validation');

const { verifyToken } = require('../util/auth');

router.route('/').get(getElectronics);

router.route('/:id').get(getElectronicValidate, getElectronic);

router.use(verifyToken);

router.route('/').post(addElectronicValidate, addElectronic);

router.route('/:id').put(editElectronicValidate, editElectronic);

router.route('/:id').delete(deleteElectronicValidate, deleteElectronic);

module.exports = router;