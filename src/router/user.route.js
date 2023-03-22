const express = require('express');
const userController = require('../controllers/user.controller');
const validations = require('../middleware/validations');

const userRouter = express.Router();

userRouter.get('/', validations.tokenValidation, userController.getAll);
userRouter.post('/', userController.registerUser);

module.exports = userRouter;