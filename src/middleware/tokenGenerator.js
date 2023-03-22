const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const JWT_CONFIG = {
    algorithm: 'HS256',
    // expiresIn: '7d',  Won't work.
};

const generateToken = (payload) => {
    console.log(payload, 'PAYLOAD');
    const token = jwt.sign(payload, secret, JWT_CONFIG);
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