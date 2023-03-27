const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'valor padrão';

const JWT_CONFIG = {
    algorithm: 'HS256',
    // expiresIn: '7d',  Won't work.
};

const generateToken = (payload) => {
    const token = jwt.sign({ data: payload }, secret, JWT_CONFIG);
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