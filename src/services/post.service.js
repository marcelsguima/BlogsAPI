const { BlogPost, Category, User, PostCategory } = require('../models');
const { sequelize } = require('../models');

const getUserPostId = async (id) => BlogPost.findByPk(id, { 
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories', through: { attributes: [] } },
] });

const deletePost = async (userId, id) => {
    try {
      const postData = await BlogPost.findByPk(id);
      if (!postData) {
        return { type: 404, message: { message: 'Post does not exist' } };
      }
      if (!userId) {
        return { type: 401, message: { message: 'Unauthorized user' } };
      }
      if (postData.dataValues.userId !== userId) {
        return { type: 401, message: { message: 'Unauthorized user' } };
      }
       await BlogPost.destroy({ where: { id } });
       return { type: 204, message: { message: 'Post deleted' } };
    } catch (error) {
      console.error(error);
      return { type: 500, message: { message: 'Internal server error' } };
    }
  };
  
const editPost = async (id, postToUpdate) => {
    BlogPost.update(postToUpdate, { where: { id } });
  };

const getPostById = async (id) => BlogPost.findOne({ where: { id },
include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
{ model: Category, as: 'categories', through: { attributes: [] } },
] });

const getAllPosts = async () => BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories', through: { attributes: [] } },
] });

const validateCategories = async (categoryIds) => {
    const allCategories = categoryIds.map((id) => Category.findOne({ where: { id } }));
    const result = await Promise.all(allCategories);
    if (result.some((e) => e === null)) {
        throw new Error('one or more "categoryIds" not found');
    }
    return result;
};

const registerNewPost = async ({ title, content, categoryIds, userId }) => {
   await validateCategories(categoryIds);    
    const t = await sequelize.transaction();
   try {
    const newPost = await BlogPost.create({
        title, content, categoryIds, userId }, { transaction: t });
    
    const allCategories = categoryIds.map((categoriesIds) => 
    ({ categoryId: categoriesIds, postId: newPost.id }));
    
    await PostCategory.bulkCreate(allCategories, { transaction: t });
    await t.commit();
    return newPost;
    } catch (error) {
        await t.rollback();
        console.log(error);
        throw error;
    }
};

module.exports = { 
    registerNewPost,
    getAllPosts,
    getPostById,
    deletePost,
    getUserPostId,
    editPost,
};