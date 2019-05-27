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
  updatedAt: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  }
});

export default LoggedInUsers;
