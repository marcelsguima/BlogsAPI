'use strict';

module.exports = (sequelize, DataTypes) => {


    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
         },
        title: DataTypes.STRING,
        content: DataTypes.STRING, 
        userId:{
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            foreignKey: true,
        },
        published: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
        tableName: 'blog_posts',
        underscored: true,
        });
  
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

return BlogPost;
}

