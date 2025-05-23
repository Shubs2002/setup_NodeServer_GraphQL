// import axios from 'axios';
import { getAllEmployees, getEmployeebyId} from "./Queries/EmployeeQueries";
import { employeeLogin, EmployeeLogout, addEmployee, deleteEmployee,updateEmployee } from "./Mutations/EmployeeMutation";
import { addUser, userLogin, userLogout } from "./Mutations/UserMutations";
import { getAllusers } from "./Queries/UserQuries";

const resolvers = {
  Query: {
   getAllEmployees,
   getEmployeebyId,
  //  User Queries
   getAllusers,
  },
  Mutation:{
    // Employee Mutations
    employeeLogin,
    EmployeeLogout,
    updateEmployee,
    addEmployee,
    deleteEmployee,
    // User Mutations
    userLogin,
    userLogout,
    addUser,

  }
};

export { resolvers };