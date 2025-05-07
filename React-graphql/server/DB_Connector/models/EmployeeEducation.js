import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelizefactory.js';


const EmployeeEducation = sequelize.define('EmployeeEducation', {
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'employees',
      key: 'Eid'
    },
    primaryKey: true
  },
  education_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'educations',
      key: 'Eduid'
    },
    primaryKey: true
  }
}, {
  tableName: 'employee_educations',
  timestamps: false
});

export default EmployeeEducation;
