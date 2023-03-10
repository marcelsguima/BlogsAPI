const { User } = require('../models');

const getAll = async () => User.findAll();

module.exports = { getAll };
