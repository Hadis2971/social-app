import Sequelize from 'sequelize';
import dbConnection from '../../database';

const Posts = dbConnection.define('posts', {
  postText: {
    type: Sequelize.STRING
  },
  user: {
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  likes: {
    type: Sequelize.INTEGER
  },
  dislikes: {
    type: Sequelize.INTEGER
  },
  profileImage: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  },
  updatedAt: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  }
});

export default Posts;
