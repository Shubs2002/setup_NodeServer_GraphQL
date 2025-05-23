// import axios from 'axios';
import { getAllEmployees, getEmployeebyId } from "./Queries/EmployeeQueries.js";
import { employeeLogin, EmployeeLogout, addEmployee, deleteEmployee, updateEmployee } from "./Mutations/EmployeeMutation.js";
import { addUser, userLogin, userLogout } from "./Mutations/UserMutations.js";
import { getAllusers } from "./Queries/UserQuries.js";
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
