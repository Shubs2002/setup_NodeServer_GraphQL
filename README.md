# 📦 GraphQL API with Sequelize and MySQL

This project is a **GraphQL API** built using **Apollo Server**, **Express**, **Sequelize**, and **MySQL**. It provides a structured and scalable backend architecture for managing employee-related data such as hobbies, education, and user accounts.

---

## 🚀 Tech Stack

- **Node.js** & **Express** – Web server
- **Apollo Server** – GraphQL API server
- **Sequelize** – ORM for MySQL
- **MySQL** – Relational database

---

## 📁 Project Structure

React-graphql/
│ <br>
├── DB_Connector/<br>
│ ├── configs/<br>
│ │ ├── config.js # DB credentials <br>
│ │ ├── sequelizefactory.js # Sequelize instance <br>
│ ├── models/<br>
│ │ ├── Employee.js<br>
│ │ ├── Hobby.js<br>
│ │ ├── Education.js<br>
│ │ ├── EmployeeHobby.js<br>
│ │ ├── EmployeeEducation.js<br>
│ │ ├── User.js<br>
│ │ ├── Association.js # Relationships between models<br>
│ │ ├── index.js # Model import and syncing<br>
│<br>
├── server.js # Main GraphQL server<br>
├── package.json # Dependencies<br>



---

## 🔧 Setup Instructions

### 1. 📥 Install Dependencies

```bash
npm install
If you run into peer dependency errors, use:

bash

npm install --legacy-peer-deps
2. ⚙️ Configure Database
 DB_Connector/configs/config.js with your MySQL credentials:

js


export default {
  development: {
    username: 'root',
    password: '',
    database: 'employeemngmtsys',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
3. 🔌 Initialize Sequelize
Sequelize is initialized in sequelizefactory.js:

js


import { Sequelize } from 'sequelize';
import configFile from './config.js';

const config = configFile.development;
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

export default sequelize;
4. 🧱 Define Models and Associations
Models are located in DB_Connector/models/. Relationships (associations) are declared in Association.js using belongsToMany().

All models are imported and synced in index.js:

js


await sequelize.authenticate();
await sequelize.sync();
console.log('✅ Connected to MySQL via Sequelize.');
5. 🧬 Define GraphQL Schema
Inside server.js, your schema might look like:

graphql


type Query {
  getEmployee(id: String): Employee
  getAllEmployees: [Employee]
}

type Mutation {
  addEmployee(...): Employee
  updateEmployee(...): Employee
  deleteEmployee(id: String!): Employee
}

type Employee {
  id: String
  name: String!
  ...
}
6. ⚙️ Implement Resolvers
Resolvers connect your schema to Sequelize queries. Define how data is fetched and modified.

Example:

js


const resolvers = {
  Query: {
    getAllEmployees: async () => await Employee.findAll(),
  },
  Mutation: {
    addEmployee: async (_, args) => await Employee.create(args),
  }
};
7. 🧪 Run and Test
Start the server:

bash


npm run build
Test via GraphQL Playground:

URL: http://localhost:4000

Example Queries
graphql


query {
  getAllEmployees {
    id
    name
  }
}
graphql


mutation {
  addEmployee(
    name: "John",
    age: 30,
    department: "Engineering",
    salary: 75000,
    birthdate: "1993-04-05",
    role: ADMIN
  ) {
    id
    name
  }
}
✅ Key Concepts
Sequelize: Models and ORM logic

Apollo Server: GraphQL server and schema

MySQL: Persistent data layer

Resolvers: Bridge between GraphQL and the database

📬 Feedback & Contributions
Feel free to fork the repo, raise issues, or suggest improvements! Collaboration is welcome.

📜 License
This project is open-source under the MIT License.





---

Would you like me to generate this file and save it directly into your project as `README.md`?
