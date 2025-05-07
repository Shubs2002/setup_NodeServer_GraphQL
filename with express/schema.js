import { makeExecutableSchema } from '@graphql-tools/schema'
import {createMockStore, addMocksToSchema} from '@graphql-tools/mock'
import resolvers from './resolvers.js';



const typeDefs = `
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

type Query{
getEmployee(id: String): Employee
getAllEmployees: [Employee]
}

type Mutation{
addEmployee(name: String!, age: Int!, department: String!, salary: Int!, birthdate: Date!, role: Role!): Employee

deleteEmployee(id: String!): Employee
updateEmployee(id: String!, name: String!, age: Int!, department: String!, salary: Int!, birthdate: Date!, role: Role!): Employee
}
`;

const schema = makeExecutableSchema({typeDefs, resolvers:resolvers});
// const mockStore = createMockStore({
//     schema,
//     mocks: {
//         Date: () => new Date().toISOString(), // Mock for scalar Date
//         Role: () => 'ADMIN', // Mock for enum Role
//         Employee: () => ({
//           id: '1',
//           name: 'John Doe',
//           age: 30,
//           department: 'Engineering',
//           salary: 75000,
//           birthdate: new Date().toISOString(),
//           role: 'ADMIN',
//         }),
//       },
// })
// const schemawithmocks =  addMocksToSchema({schema, store:mockStore})
// addMockFunctionsToSchema({schema});

// export default schemawithmocks
export default schema