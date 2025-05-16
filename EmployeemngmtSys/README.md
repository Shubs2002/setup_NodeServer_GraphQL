
# Integrating GraphQL as Middleware to Access Flask Backend APIs

Now that we've already set up the basic structure of our GraphQL server with **type definitions** and **resolvers**, let’s proceed with the implementation of GraphQL as a middleware that interacts with our Flask backend.

---

## Step 1: Define GraphQL Types, Queries, and Mutations

### 1.1 Type Definitions

We must define GraphQL types that match the responses returned from our Flask backend. For example:

```graphql
type MessageResponse {
  message: String
}

type Employee {
  Eid: String
  EName: String
  Ephone: String
  Ebirth_date: Date
  Egender: String
  Edescription: String
  Efile_path: String
  hobbies: [String]
  educations: [String]
}
```

---

### 1.2 Define Queries and Mutations

By defining queries and mutations first, we get a clear understanding of the inputs and outputs required, which will inform the rest of our schema.

#### Queries

```graphql
type Query {
  # Employee Queries
  getAllEmployees: [Employee]
  getEmployeebyId(id: String): Employee

  # User Queries
  getAllUsers: [User]
}
```

#### Mutations

```graphql
type Mutation {
  # Employee Mutations
  addEmployee(input: AddEmployeeInput!): MessageResponse
  updateEmployee(id: String, input: UpdateEmployeeInput!): MessageResponse
  deleteEmployee(id: String): MessageResponse
  employeeLogin(Employee_login_data: LoginEmployeeInput!): LoginEmployeeResponse
  employeeLogout: MessageResponse

  # User Mutations
  addUser(input: UserAddInput!): AddUserResponse
  userLogin(User_login_data: UserLoginInput!): LoginUserResponse
  userLogout: MessageResponse
}
```

---

### 1.3 Input Types

Let’s define input types used in mutations. For instance:

```graphql
input UpdateEmployeeInput {
  name: String
  phone_no: String
  birth_date: Date
  gender: String
  description: String
  hobbies: String!
  education: String!
  file: Upload
}
```

---

## Step 2: Set Up Resolvers

Organize resolvers into separate files for better scalability.

### Example Structure

- `resolvers/queries/employee.ts`
- `resolvers/mutations/employee.ts`
- `resolvers/index.ts` (main entry point)

### Import and Combine Resolvers

```ts
// resolvers/index.ts
import * as EmployeeQuery from './queries/employee';
import * as EmployeeMutation from './mutations/employee';

export const resolvers = {
  Query: {
    ...EmployeeQuery,
  },
  Mutation: {
    ...EmployeeMutation,
  },
};
```

---

### Query Example: `getEmployeebyId`

```ts
// resolvers/queries/employee.ts
import axios from 'axios';

export const getEmployeebyId = async (_: any, args: { id: string }) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/employee/${args.id}`);
    const employee = response.data;

    return {
      Eid: employee.id.toString(),
      EName: employee.name,
      Ephone: employee.phone_no,
      Ebirth_date: employee.birth_date,
      Egender: employee.gender,
      Edescription: employee.description,
      Efile_path: employee.file_path,
      hobbies: employee.hobbies,
      educations: employee.education,
    };
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('GraphQL failed to fetch employee data from the backend.');
  }
};
```

---

### Mutation Example: `updateEmployee`

```ts
// resolvers/mutations/employee.ts
import axios from 'axios';

export const updateEmployee = async (
  _: any,
  args: {
    id: string;
    input: {
      name: string;
      phone_no: string;
      birth_date: Date;
      gender: string;
      description: string;
      hobbies: string;
      education: string;
    };
  }
) => {
  try {
    const response = await axios.put(`http://127.0.0.1:5000/update-employee/${args.id}`, args.input);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('GraphQL failed to update employee in the backend.');
  }
};
```

---

## Step 3: Setup Apollo Server

Configure Apollo Server by passing in the `typeDefs` and `resolvers`.

```ts
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true,
  csrfPrevention: false,
  cache: 'bounded',
});
```

> **Note:** Apollo Server v4 does not support file uploads natively. Consider using a third-party service like Cloudinary or handling file uploads outside GraphQL (e.g., via REST).

---

## Step 4: Querying and Mutating from the Client

### Example Query

```graphql
query {
  getEmployeebyId(id: "123") {
    Eid
    EName
    Ephone
    hobbies
    educations
  }
}
```

### Example Mutation

```graphql
mutation {
  updateEmployee(
    id: "123",
    input: {
      name: "John Doe",
      phone_no: "1234567890",
      birth_date: "1990-01-01",
      gender: "Male",
      description: "Updated employee",
      hobbies: "Reading",
      education: "Masters"
    }
  ) {
    message
  }
}
```

---

## Final Notes

- Always handle errors from the Flask backend and surface them meaningfully in your GraphQL responses.
- Use `@graphql-tools/merge` or similar libraries if your schema and resolvers grow large and you want to modularize further.
- Enable GraphQL Playground or use tools like Postman/Insomnia to test your queries and mutations efficiently.
