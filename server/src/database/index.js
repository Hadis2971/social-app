import Sequelize from 'sequelize';
import { dbConfig } from '../config';

const dbConnection = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
  dialect: 'mysql',
  host: dbConfig.dbHost
});

export default dbConnection;
