import { Sequelize } from 'sequelize';
import configFile from './config.js';

const config = configFile.development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

export default sequelize;