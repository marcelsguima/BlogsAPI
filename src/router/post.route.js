const express = require('express');
const postController = require('../controllers/post.controller');
const validations = require('../middleware/validations');

const postRouter = express.Router();

postRouter.post('/', validations.tokenValidation, postController.registerPost);
postRouter.get('/', validations.tokenValidation, postController.getAllPosts);
postRouter.get('/:id', validations.tokenValidation, postController.getPostById);

module.exports = postRouter;