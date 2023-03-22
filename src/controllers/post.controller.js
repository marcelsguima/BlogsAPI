const postService = require('../services/post.service');

// const getAllCategories = async (req, res) => {
//   const users = await categoryService.getAllCategories();
//   res.status(200).json(users);
// };

const registerPost = async (req, res) => {
  const { title, content, categoryIds, data: { id } } = req.body;
  const newPost = await postService.registerNewPost({ title, content, categoryIds, id });
  res.status(201).json(newPost);
  };

module.exports = {
    // getAllCategories,
    registerPost,
};
