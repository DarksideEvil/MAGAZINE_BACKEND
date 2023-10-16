const userModel = require('../user/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    const { fullname, email, phone, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            const isValidPswd = await bcrypt.compare(password, user.password);
            if (isValidPswd)
                return res.status(409).send('"This email user exists 📅"');
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPswd = await bcrypt.hash(password, salt);
            const newUser = new userModel({
                fullname: fullname,
                phone: phone,
                email: email,
                password: hashedPswd,
                silverPoint: 1 // Incrementing silverPoint directly
            });
            await newUser.save();
            const token = jwt.sign(
                {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    role: newUser.role
                },
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: process.env.USER_TOKEN_EXPIRESIN }
            );
            return res.status(200).json({ jwt_key: token });
        }
    } catch (err) {
        if (err.code === 11000)
            return res.status(400).send('"Failed! This email user exists!"');
    }
}

module.exports = signUp;