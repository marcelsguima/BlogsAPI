const { User } = require('../models');

const login = async (email, password) => {
const result = await User.findOne({ where: { email, password } });
// if (!result) return console.log('WRONG');
// console.log(result, 'result');
return result;
};
module.exports = { login };
