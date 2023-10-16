const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const bearerToken = token.split(" ");
        const decoded = await jwt.verify(bearerToken[1], process.env.TOKEN_SECRET_KEY);
        if (!decoded)
            res.status(403).send('token\'s not valid');
        req.user = decoded;

        return next();
    } catch (err) {
        return res.status(401).send(err.message);
    }
}