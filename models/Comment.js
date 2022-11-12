var { Model, DataTypes, INTEGER } = require('sequelize');
var sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
    },
    post_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
        type:DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'makeStamp',
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
