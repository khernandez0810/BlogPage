const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  commentText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  blog_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'blog',
      key: 'id',
    },
    date: {
      type: DataTypes.DATE,
      default: DataTypes.NOW,
    },
  },
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment',
});

module.exports = Comment;
