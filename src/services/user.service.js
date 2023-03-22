const { User } = require('../models');

const getAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const registerUser = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image });
   return user.dataValues.id;
};

module.exports = { 
    getAll, 
    registerUser,
    getUserByEmail,
 };
