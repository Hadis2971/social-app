import Sequelize from 'sequelize';
import dbConnection from '../../database';

const UsersPostsLikes = dbConnection.define('usersPostsLikes', {
  user: {
    type: Sequelize.INTEGER
  },
  post: {
    type: Sequelize.INTEGER
  },
  liked: {
    type: Sequelize.BOOLEAN
  },
  disliked: {
    type: Sequelize.BOOLEAN
  },
  createdAT: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  },
  updatedAT: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  }
});

export default UsersPostsLikes;
