const { Category } = require('../models');

const getAllCategories = async () => Category.findAll();

const registerCategory = async (name) => {
  const category = await Category.create({ name });
   return category;
};

module.exports = { 
   getAllCategories, 
   registerCategory,

 };
