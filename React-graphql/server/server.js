import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from "express"
import './DB_Connector/models/index.js'
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import Education from "./DB_Connector/models/Education.js";
import Hobby from "./DB_Connector/models/Hobby.js";
import User from "./DB_Connector/models/User.js";
import Employee from "./DB_Connector/models/Employee.js";
import EmployeeHobby from "./DB_Connector/models/EmployeeHobby.js";
import EmployeeEducation from "./DB_Connector/models/EmployeeEducation.js";
import { expressMiddleware } from '@apollo/server/express4';
const typeDefs = `

scalar Date

# MODELS

type Employee {
  Eid: String
  EName: String
  Ephone: String
  Ebirth_date: Date
  Egender: String
  Edescription: String
  Efile_path: String
  hobbies: [Hobby]
  educations: [Education]
}

type Hobby {
  Hid: String
  Hname: String
}

type Education {
  Eduid: String
  Eduname: String
}

type User {
  id: String
  username: String
  email: String
  password: String
}


# INPUTS

input EmployeeInput {
  name: String
  phone: String
  birthDate: Date
  gender: String
  description: String
  filePath: String
  hobbyIds: [String]
  educationIds: [String]
  password: String
}

input UserInput {
  username: String
  email: String
  password: String
}

# QUERY

type Query {
  getAllEmployees: [Employee]
  getEmployee(id: String): Employee
  getAllUsers: [User]
  getAllHobbies: [Hobby]
  getAllEducations: [Education]
}

# MUTATION

type Mutation {
  addEmployee(input: EmployeeInput!): Employee
  updateEmployee(id: ID!, input: EmployeeInput!): Employee
  deleteEmployee(id: ID!): Boolean

  addUser(input: UserInput!): User
  deleteUser(id: ID!): Boolean

  addHobby(name: String!): Hobby
  addEducation(name: String!): Education
}
`;


// In your resolvers (example snippet)
const resolvers = {
  Query: {
    getAllEmployees: async () => {
      const allEmployees = await Employee.findAll({
        include: [
          {
            model: Hobby,
            through: { attributes: [] }, // Exclude the join table attributes
          },
          {
            model: Education,
            through: { attributes: [] }, // Exclude the join table attributes
          },
        ],
      });
    
      if (!allEmployees || allEmployees.length === 0) {
        throw new Error("No Employees Found!");
      }
    
      // Map hobbies and educations for each employee
      const employeesWithDetails = allEmployees.map((employee) => {
        const hobbies = employee.Hobbies.map((hobby) => ({
          Hid: hobby.Hid,
          Hname: hobby.Hname,
        }));
    
        const educations = employee.Education.map((education) => ({
          Eduid: education.Eduid,
          Eduname: education.Eduname,
        }));
        
        // Append hobbies and educations to the employee object
        return {
          ...employee.dataValues,
          hobbies,
          educations,
        };
      });
    
    
      return employeesWithDetails;
    },
    getEmployee: async (_, { id }) => {
      const employee = await Employee.findByPk(id, {
        include: [
          {
            model: Hobby,
            through: { attributes: [] }, // Exclude the join table attributes
          },
          {
            model: Education,
            through: { attributes: [] }, // Exclude the join table attributes
          },
        ],
      });
      // console.log()
      console.log("Employee Details:", employee);
      // console.log("Hobbies:", employee?.Hobbies.Hobby.dataValues || []);
      // console.log("Education:", employee?.Educations.Education.dataValues || []);
      if(!employee){
        throw new Error(`Employee with id ${id} not found`);
      }
      const hobbies = employee.Hobbies.map((hobby) => ({
        Hid: hobby.Hid,
        Hname: hobby.Hname,
      }));
    
      const educations = employee.Education.map((education) => ({
        Eduid: education.Eduid,
        Eduname: education.Eduname,
      }));
      employee.dataValues.hobbies = hobbies
      employee.dataValues.educations = educations
    
      return employee.dataValues

    }, 
    getAllUsers: async () => await User.findAll(),
    getAllHobbies: async () => await Hobby.findAll(),
    getAllEducations: async () => await Education.findAll(),
  },
  

  Mutation: {
    addEmployee: async (_, { input }) => {
      const employee = await Employee.create({
        EName: input.name,
        Ephone: input.phone,
        Ebirth_date: input.birthDate,
        Egender: input.gender,
        Edescription: input.description,
        Efile_path: input.filePath,
        password: input.password,
      });
      if (input.hobbyIds) await employee.setHobbies(input.hobbyIds);
      if (input.educationIds) await employee.setEducations(input.educationIds);
      return employee;
    },
    updateEmployee: async (_, { id, input }) => {
      const employee = await Employee.findByPk(id);
      await employee.update({
        EName: input.name,
        Ephone: input.phone,
        Ebirth_date: input.birthDate,
        Egender: input.gender,
        Edescription: input.description,
        Efile_path: input.filePath,
        password: input.password,
      });
      if (input.hobbyIds) await employee.setHobbies(input.hobbyIds);
      if (input.educationIds) await employee.setEducations(input.educationIds);
      return employee;
    },
    deleteEmployee: async (_, { id }) => {
      const deleted = await Employee.destroy({ where: { Eid: id } });
      return deleted > 0;
    },
    addUser: async (_, { input }) => await User.create(input),
    deleteUser: async (_, { id }) => {
      const deleted = await User.destroy({ where: { id } });
      return deleted > 0;
    },
    addHobby: async (_, { name }) => await Hobby.create({ Hname: name }),
    addEducation: async (_, { name }) => await Education.create({ Eduname: name }),
  },

};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({typeDefs,resolvers,  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]});
await server.start();
app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
// const {url}= await startStandaloneServer(server,{
//     listen:{port:4000}
// })

// console.log(`Server is Running at: ${url}`)

// Query, Mutation, Subscrptions

// for this we will use typeDefs : what typeDefs does is it is only defining the type it s not telling the API to how to deal with the data.
//  there are resolvers who are responsible to do the functionality of the API.
//  for example if we want to get the data from the database then we will use resolvers to do that. so we will use typeDefs and resolvers together to create the API.

