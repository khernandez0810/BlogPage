const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json')
const seedDatabase = async () => {
  try{
await sequelize.sync({force:true})
await User.bulkCreate(userData, {
  individualHooks:true
});
await Blog.bulkCreate(blogData);
await Comment.bulkCreate(commentData)
process.exit(0);
  }
  catch(err){
    console.log(err)
  }
};
seedDatabase();
