const userModel = require('../user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userAuth = async (req, res) => {
    try {
        const ourUser = await userModel.findOne({email: req.body.email});
        if (!ourUser)
            res.status(400).send('email/password is wrong! 🙅🏻‍♂️');
        else {
            const isValidPswd = await bcrypt.compare(req.body.password, ourUser.password);
        if (!isValidPswd)
            res.status(400).send('email/password is wrong! 🤕');
        const token = jwt.sign(
            {
                _id: ourUser._id,
                fullname: ourUser.fullname,
                email: ourUser.email,
                role: ourUser.role
            },
            process.env.TOKEN_SECRET_KEY, {expiresIn: process.env.USER_TOKEN_EXPIRESIN}
        );
        
        return res.status(200).json({jwt_key: token});
        }
    } catch (err) {
        return res.status(400).send(err);
    }
}

const adminAuth = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const ourUser = await userModel.findOne({email: req.body.email});
        if (!ourUser)
            res.status(400).send('email/password is wrong! 🙅🏻‍♂️');
        else {
            const isValidPswd = await bcrypt.compare(req.body.password, ourUser.password);
        if (!isValidPswd)
            res.status(400).send('email/password is wrong! 🤕');
        const token = jwt.sign(
            {
                _id: null,
                fullname: ourUser.fullname,
                email: ourUser.email,
                role: ourUser.role
            },
            process.env.TOKEN_SECRET_KEY, {expiresIn: process.env.ADMIN_TOKEN_EXPIRESIN}
        );
        
        return res.status(200).json({jwt_key: token});
        }
        } else {
            res.status(400).send('email/password is wrong ❗');
        }
    } catch (err) {
        return res.status(400).send(err);
    }
}

const bossAuth = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (email === process.env.BOSS_EMAIL && password === process.env.BOSS_PASSWORD){
            const ourUser = await userModel.findOne({email: req.body.email});
        if (!ourUser)
            res.status(400).send('email/password is wrong! 🙅🏻‍♂️');
        else {
            const isValidPswd = await bcrypt.compare(req.body.password, ourUser.password);
        if (!isValidPswd)
            res.status(400).send('email/password is wrong! 🤕');
        const token = jwt.sign(
            {
                _id: null,
                fullname: ourUser.fullname,
                email: ourUser.email,
                role: ourUser.role
            },
            process.env.TOKEN_SECRET_KEY, {expiresIn: process.env.BOSS_TOKEN_EXPIRESIN}
        );
        
        return res.status(200).json({jwt_key: token});
        }
        } else {
            res.status(400).send('email/password is wrong ❗');
        }
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports = {
    userAuth,
    adminAuth,
    bossAuth
}