import Sequelize from 'sequelize';
import dbConnection from '../index';

const RefreshTokens = dbConnection.define('refreshTokens', {
  user: {
    type: Sequelize.INTEGER
  },
  refreshToken: {
    type: Sequelize.STRING
  },
  blacklisted: {
    type: Sequelize.BOOLEAN
  },
  createdAT: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  },
  updatedAT: {
    type: 'TIMESTAMP',
    default: Sequelize.NOW
  },
  expirationDate: {
    type: 'DATE'
  }
});

export default RefreshTokens;
