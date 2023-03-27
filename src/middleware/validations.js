const Joi = require('joi');
const jwt = require('jsonwebtoken');
const postService = require('../services/post.service');

function extractDataValues(getPosts) {
  return getPosts.map((blogPost) => {
    const { id, title, content, userId, published, updated } = blogPost.dataValues;
    const { id: userIdValue, displayName, email, image } = blogPost.user.dataValues;
    const categories = blogPost.categories.map((category) => category.dataValues);
    return { id,
      title,
      content,
      userId,
      published,
      updated,
      user: { 
        id: userIdValue, displayName, email, image },
      categories };
  });
}

const queryValidation = async (req, res, next) => {
  const { q } = req.query;
  console.log(q, 'q');

  if (q === '') {
    const getPosts = await postService.getAllPosts();
    const allPosts = extractDataValues(getPosts);
    console.log(allPosts, 'allPosts');
    return res.status(200).json(allPosts);
  }
  next();
};

const registerUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const registerPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
  content: Joi.string().required(),
  categoryIds: Joi.array(),
  userId: Joi.number().required(),
});
const secret = process.env.JWT_SECRET || 'valor padrão';
const registerCategorySchema = Joi.object({ name: Joi.string().required() });

const tokenValidation = (req, res, next) => {
  try {
    const authorization = req.header('Authorization');
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    // console.log(authorization);
    const { data } = jwt.verify(authorization, secret);
    req.payload = data;
    next();
  } catch (error) {
    // console.log(error, 'error');
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
module.exports = { 
    registerUserSchema,
    registerCategorySchema,
    tokenValidation,
    registerPostSchema,
    queryValidation,
 }; 
