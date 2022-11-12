var { Model, DataTypes } = require('sequelize');
var sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    author: {
        type:DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'makeStamp',
    updatedAt:'changeStamp',
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
