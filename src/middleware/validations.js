const Joi = require('joi');
const { verifyToken } = require('./tokenGenerator');

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
  categoryIds: Joi.array()
    .length(2)
    .items(Joi.number())
    .required()
    .messages({
      'array.length': 'One or more "categoryIds" not found',
    }),
     userId: Joi.number().required(),
});

const registerCategorySchema = Joi.object({ name: Joi.string().required() });

const tokenValidation = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = verifyToken(authorization);
    console.log(payload, 'PAYLOAD');
    req.body.userId = Number(payload);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
module.exports = { 
    registerUserSchema,
    registerCategorySchema,
    tokenValidation,
    registerPostSchema,
 }; 
