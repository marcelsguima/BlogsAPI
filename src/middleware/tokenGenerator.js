const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const JWT_SECRET = {
    algorithm: 'HS256',
    expiresIn: '7d',
};

const generateToken = (payload) => {
    const token = jwt.sign(payload, secret, JWT_SECRET);
    return token;
};

const verifyToken = (token) => {
    const decoded = jwt.verify(token, secret);
    return decoded;
};

module.exports = {
    generateToken,
    verifyToken,
};