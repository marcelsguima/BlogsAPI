const { BlogPost, PostCategory } = require('../models');

const registerNewPost = async ({ title, content, categoryIds, id }) => {
    const newPost = await BlogPost.create({
        title, content, categoryIds, userId: id });
    const allCategories = categoryIds.map(async (categoriesIds) => 
    ({ categoryId: categoriesIds, postId: newPost.id }));
    const result = await Promise.all(allCategories);
    await PostCategory.bulkCreate(result);
    return newPost;
};

module.exports = { registerNewPost };