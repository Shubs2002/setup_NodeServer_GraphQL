import { Sequelize } from 'sequelize';
import './Employee.js';
import './Hobby.js';
import './Education.js';
import './EmployeeHobby.js';
import './EmployeeEducation.js';
import './User.js';
import './Association.js';
import sequelize from '../configs/sequelizefactory.js';

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('✅ Connected to MySQL via Sequelize.');
} catch (error) {
  console.error('❌ Unable to connect:', error);
}

export default sequelize;
