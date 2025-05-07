import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelizefactory.js';


const Hobby = sequelize.define('Hobby', {
  Hid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Hname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'hobbies',
  timestamps: false
});

export default Hobby;
