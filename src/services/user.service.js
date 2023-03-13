const { User } = require('../models');

const getAll = async () => User.findAll();

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const registerUser = async (displayName, email, password, image) => {
    User.create({ displayName, email, password, image });
};

module.exports = { 
    getAll, 
    registerUser,
    getUserByEmail,
 };
