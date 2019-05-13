import Sequelize from 'sequelize';
import dbConnection from '../../database';

const Friends = dbConnection.define('friends', {
  friendOne: {
    type: Sequelize.STRING
  },
  friendTwo: {
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

export default Friends;
