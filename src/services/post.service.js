const { BlogPost, Category, User, PostCategory } = require('../models');
const { sequelize } = require('../models');

const getAllPosts = async () => BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories', through: { attributes: [] } },
] });

const registerNewPost = async ({ title, content, categoryIds, userId }) => {
    console.log(title, content, categoryIds, userId);
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
 };