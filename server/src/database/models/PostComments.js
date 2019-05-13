import Sequelize from 'sequelize';
import dbConnection from '../../database';

const PostComments = dbConnection.define('postComments', {
  comment: {
    type: Sequelize.STRING
  },
  post: {
    type: Sequelize.INTEGER
  },
  user: {
    type: Sequelize.INTEGER
  },
  profileImage: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
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

export default PostComments;
