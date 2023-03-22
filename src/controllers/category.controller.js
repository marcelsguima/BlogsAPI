const categoryService = require('../services/category.service');

const getAllCategories = async (req, res) => {
  const users = await categoryService.getAllCategories();
  res.status(200).json(users);
};

const registerCategory = async (req, res) => {
  const { name } = req.body;
  try {
      if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    const newCategory = await categoryService.registerCategory(name);
    res.status(201).json(newCategory);
     } catch (err) {
    console.error(err.message);
    if (err.isJoi) {
      return res.status(400).json({ message: err.details[0].message });
    }
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
    getAllCategories,
    registerCategory,
};
