const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'valor padrão';

const JWT_CONFIG = {
    algorithm: 'HS256',
    // expiresIn: '7d',  Won't work.
};

const generateToken = (payload) => {
    console.log(typeof payload, 'PAYLOAD');
    const token = jwt.sign(payload, secret, JWT_CONFIG);
    return token;
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        throw new Error('message');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};