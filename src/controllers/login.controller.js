const loginService = require('../services/login.service');
const { generateToken } = require('../middleware/tokenGenerator');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }
  const newUser = await loginService.login(email, password);
  if (!newUser) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  
  const token = generateToken({ newUser });
  return res.status(200).json({ token });
};

module.exports = {
    createUser,
    
};
