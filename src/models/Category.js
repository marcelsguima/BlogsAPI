'use strict';

module.exports = (sequelize, DataTypes) => {


    const Categories = sequelize.define('Category', {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
         },
        name: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'categories',
        underscored: true,
        });
  

return Categories;
}

