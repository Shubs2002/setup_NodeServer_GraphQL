import Employee from './Employee.js';
import Hobby from './Hobby.js';
import Education from './Education.js';
import EmployeeHobby from './EmployeeHobby.js';
import EmployeeEducation from './EmployeeEducation.js';

// Employee <-> Hobby (many-to-many)
Employee.belongsToMany(Hobby, {
  through: EmployeeHobby,
  foreignKey: 'employee_id',
  otherKey: 'hobby_id'
});
Hobby.belongsToMany(Employee, {
  through: EmployeeHobby,
  foreignKey: 'hobby_id',
  otherKey: 'employee_id'
});

// Employee <-> Education (many-to-many)
Employee.belongsToMany(Education, {
  through: EmployeeEducation,
  foreignKey: 'employee_id',
  otherKey: 'education_id'
});
Education.belongsToMany(Employee, {
  through: EmployeeEducation,
  foreignKey: 'education_id',
  otherKey: 'employee_id'
});
