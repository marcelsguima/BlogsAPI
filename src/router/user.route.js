const express = require('express');
const userController = require('../controllers/user.controller');
const validations = require('../middleware/validations');

const userRouter = express.Router();

userRouter.get('/', validations.tokenValidation, userController.getAll);
userRouter.post('/', userController.registerUser);
userRouter.get('/:id', validations.tokenValidation, userController.getUserById);
userRouter.delete('/me', validations.tokenValidation, userController.deleteMe);

module.exports = userRouter;