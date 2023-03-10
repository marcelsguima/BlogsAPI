const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

module.exports = {
    getAll,
};
