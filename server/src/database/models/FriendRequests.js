import Sequelize from 'sequelize';
import dbConnection from '../../database';

const FriendRequests = dbConnection.define('friendRequests', {
  requestingUser: {
    type: Sequelize.INTEGER
  },
  requestedUser: {
    type: Sequelize.INTEGER
  },
  accepted: {
    type: Sequelize.BOOLEAN,
    default: false
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

export default FriendRequests;
