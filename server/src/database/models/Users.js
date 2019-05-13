import Sequelize from 'sequelize';
import dbConnection from '../index';

const Users = dbConnection.define('users', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
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

export default Users;
