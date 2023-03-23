const postService = require('../services/post.service');
const { registerPostSchema } = require('../middleware/validations');

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const registerPost = async (req, res) => {
  try {
  const { title, content, categoryIds, userId } = req.body;
  const { error } = await registerPostSchema.validateAsync(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }  
  console.log(req.body);
  const newPost = await postService.registerNewPost({ title, content, categoryIds, userId });
  res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    if (err.isJoi) {
      return res.status(400).json({ message: err.details[0].message });
    }
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
    getAllPosts,
    registerPost,
    getPostById,
};
