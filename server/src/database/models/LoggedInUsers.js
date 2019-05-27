import Sequelize from 'sequelize';
import dbConnection from '../../database';

const LoggedInUsers = dbConnection.define('loggedInUsers', {
  user: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  },
  username: {
    type: Sequelize.STRING
  },
  profileImage: {
    type: Sequelize.STRING
  },
  updatedAt: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  }
});

export default LoggedInUsers;
