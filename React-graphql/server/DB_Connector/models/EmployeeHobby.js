import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelizefactory.js';


const EmployeeHobby = sequelize.define('EmployeeHobby', {
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'employees',
      key: 'Eid'
    },
    primaryKey: true
  },
  hobby_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'hobbies',
      key: 'Hid'
    },
    primaryKey: true
  }
}, {
  tableName: 'employee_hobbies',
  timestamps: false
});

export default EmployeeHobby;
