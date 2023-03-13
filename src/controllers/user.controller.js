const userService = require('../services/user.service');
const { generateToken } = require('../middleware/tokenGenerator');
const { registerUserSchema } = require('../middleware/validations');

const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

const registerUser = async (req, res) => {
  try {
  const { displayName, email, password, image } = await registerUserSchema.validateAsync(req.body);
    const userExists = await userService.getUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const newUser = await userService.registerUser(displayName, email, password, image);
    const token = generateToken({ newUser });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    if (err.isJoi) {
      return res.status(400).json({ message: err.details[0].message });
    }
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
    getAll,
    registerUser,
};
