const { User } = require('../models');

const getAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const getUserById = async (id) => User.findOne({
    where: { id }, attributes: { exclude: ['password'] } });

const registerUser = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image });
   return user.dataValues.id;
};

const deleteMe = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = { 
    getAll, 
    registerUser,
    getUserByEmail,
    getUserById,
    deleteMe,
 };
