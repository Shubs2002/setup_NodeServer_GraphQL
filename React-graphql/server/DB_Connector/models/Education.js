import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelizefactory.js';


const Education = sequelize.define('Education', {
  Eduid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Eduname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'educations',
  timestamps: false
});

export default Education;
