const userService = require('../services/user.service');
const { generateToken } = require('../middleware/tokenGenerator');
const { registerUserSchema } = require('../middleware/validations');
const { verifyToken } = require('../middleware/tokenGenerator');

const deleteMe = async (req, res) => {
  const token = verifyToken(req.headers.authorization);
  console.log('TOKEN', token, 'TOKEN');
  const { id } = token;
  console.log(id, 'USERID');
  await userService.deleteMe(id);
  return res.status(204).json();
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  res.status(200).json(user);
};

const registerUser = async (req, res) => {
  try {
  const { displayName, email, password, image } = await registerUserSchema.validateAsync(req.body);
    const userExists = await userService.getUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const newUser = await userService.registerUser(displayName, email, password, image);
    console.log(newUser, 'NEWUSER');
    const token = generateToken(newUser);
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
    getUserById,
    deleteMe,
};
