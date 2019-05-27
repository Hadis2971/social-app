import Sequelize from 'sequelize';
import dbConnection from '../index';

const Notifications = dbConnection.define('notifications', {
  liked: {
    type: Sequelize.BOOLEAN
  },
  disliked: {
    type: Sequelize.BOOLEAN
  },
  commented: {
    type: Sequelize.BOOLEAN
  },
  user: {
    type: Sequelize.INTEGER
  },
  post: {
    type: Sequelize.INTEGER
  },
  notified: {
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

export default Notifications;
