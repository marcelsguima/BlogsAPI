const express = require('express');
const categoryController = require('../controllers/category.controller');
const validations = require('../middleware/validations');

const categoryRouter = express.Router();

categoryRouter.post('/', validations.tokenValidation, categoryController.registerCategory);
categoryRouter.get('/', validations.tokenValidation, categoryController.getAllCategories);

module.exports = categoryRouter;