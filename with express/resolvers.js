import mongoose from "mongoose";
import Employeemodel from "./models/Employee.js";

// const employees = [{
//     id: 1,
//     name: "Shubham Nakashe" ,
//     age: 22,
//     department: "Software Developer",
//     salary: 15000,
//     birthdate: new Date(2002, 5, 28).toISOString(),
//     role: "USER",
    
// },
// {
//     id: 2,
//     name: "Shraddha Shinde",
//     age: 30,
//     department: "The Orchard",
//     salary: 40000,
//     birthdate: new Date(1995, 5, 28).toISOString(),
//     role: "ADMIN",
    
// },
// {
//     id: 3,
//     name: "Bhavin Shah",
//     age: 40,
//     department: "PROJECT MANAGEMENT",
//     salary: 95000,
//     birthdate: new Date(1989, 5, 28).toISOString(),
//     role: "ADMIN",
    
// }
// ]


const resolvers = {

    Query : {
        getAllEmployees: ()=>{
            return employees;
        },
        getEmployee: (parent, args) => {
            const employee = employees.find(emp => emp.id === parseInt(args.id));
            if (!employee) {
                throw new Error(`Employee with id ${args.id} not found`);
            }
            return employee;
        },
    },

    Mutation:{
        addEmployee: async (parent, args) => {
            const { name, age, department, salary, birthdate, role } = args;
            const newEmployee = new Employeemodel({
                name,
                age,
                department,
                salary,
                birthdate,
                role
            });
            await newEmployee.save();
            return newEmployee;
        },

        deleteEmployee: async (parent, args) => {
            const { id } = args;
            const employee = await Employeemodel.findOneAndDelete({id:id});
            if (!employee) {
                throw new Error(`Employee with id ${id} not found`);
            }
            return employee;
        },
        updateEmployee: async (parent, args) => {
            const { id, name, age, department, salary, birthdate, role } = args;
            const employee = await Employeemodel.findOneAndUpdate({id : id}, {
                name,
                age,
                department,
                salary,
                birthdate,
                role
            }, { new: true });
            if (!employee) {
                throw new Error(`Employee with id ${id} not found`);
            }
            return employee;
        },
    }
}

export default resolvers