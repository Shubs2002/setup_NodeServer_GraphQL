import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import express from "express"
import './DB_Connector/models/index.js'

const typeDefs = `

type Query{
    getEmployee(id: String): Employee
    getAllEmployees: [Employee]
    }
    
    type Mutation{
    addEmployee(name: String!, age: Int!, department: String!, salary: Int!, birthdate: Date!, role: Role!): Employee
    
    deleteEmployee(id: String!): Employee
    updateEmployee(id: String!, name: String!, age: Int!, department: String!, salary: Int!, birthdate: Date!, role: Role!): Employee
    }


scalar Date

enum Role{
    ADMIN,
    USER
}
type Employee{
id: String 
name: String!
age: Int
department: String!
salary: Int!
birthdate: Date!
role: Role!
}
`

const resolvers= {

}

const server = new ApolloServer({typeDefs,resolvers});

const {url}= await startStandaloneServer(server,{
    listen:{port:4000}
})

console.log(`Server is Running at: ${url}`)


// Query, Mutation, Subscrptions

// for this we will use typeDefs : what typeDefs does is it is only defining the type it s not telling the API to how to deal with the data.
//  there are resolvers who are responsible to do the functionality of the API.
//  for example if we want to get the data from the database then we will use resolvers to do that. so we will use typeDefs and resolvers together to create the API.

