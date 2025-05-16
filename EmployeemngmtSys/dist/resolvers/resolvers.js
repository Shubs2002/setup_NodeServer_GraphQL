// import axios from 'axios';
import { getAllEmployees, getEmployeebyId } from "./EmployeeQueries.js";
import { employeeLogin, EmployeeLogout, addEmployee, deleteEmployee, updateEmployee } from "./EmployeeMutation.js";
import { addUser, userLogin, userLogout } from "./UserMutations.js";
import { getAllusers } from "./UserQuries.js";
const resolvers = {
    Query: {
        getAllEmployees,
        getEmployeebyId,
        //  User Queries
        getAllusers,
    },
    Mutation: {
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
