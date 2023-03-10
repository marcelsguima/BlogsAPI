'use strict';

module.exports = (sequelize, DataTypes) => {


    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type:DataTypes.INTEGER,
            foreignKey: true,
         },
        categoryId: {
            type:DataTypes.INTEGER,
            foreignKey: true,
         },
    }, {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
        });
  
    PostCategory.associate = ({BlogPost, Category}) => {
        BlogPost.belongsToMany(Category, { 
            foreignKey: 'postId', 
            as: 'categories',
            through: PostCategory, 
            otherKey: 'categoryId',
        });
        Category.belongsToMany(BlogPost, {
            foreignKey: 'categoryId',
            as: 'posts',
            through: PostCategory,
            otherKey: 'postId',
        });
    };

return PostCategory;
}

