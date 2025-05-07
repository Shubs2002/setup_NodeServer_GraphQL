import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelizefactory.js';

const Employee = sequelize.define('Employee', {
  Eid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  EName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Ephone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  Ebirth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Egender: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  Edescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Efile_path: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'employees',
  timestamps: false
});

export default Employee;
