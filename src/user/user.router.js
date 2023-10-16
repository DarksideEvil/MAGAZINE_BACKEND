const router = require('express').Router();

const {
    addUser,
    getUsers,
    getUser,
    editUser,
    deleteUser
} = require('../user/user.controller');

const {
    addUserValidate,
    getUserValidate,
    editUserValidate,
    deleteUserValidate
} = require('./user.validation');

const { verifyToken } = require('../util/auth');

router.use(verifyToken);

router.route('/').post(addUserValidate, addUser);

router.route('/').get(getUsers);

router.route('/:id').get(getUserValidate, getUser);

router.route('/:id').put(editUserValidate, editUser);

router.route('/:id').delete(deleteUserValidate, deleteUser);

module.exports = router;