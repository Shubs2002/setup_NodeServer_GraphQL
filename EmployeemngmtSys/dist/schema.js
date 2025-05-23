const typeDefs = `
scalar Date
scalar Upload

# MODELS

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



type LoginEmployee {
  id: Int
  name: String
}


type User {
  id: String
  username: String
  email: String
  password: String
}


type LoginUSer{
username: String
}


#Response

type addUserResponse{
message: String
user:subUserDataforResponse
}

type subUserDataforResponse{
email: String
username: String
}
type LoginUserResponse {
  access_token: String
  refresh_token: String
  user: LoginUSer
  message: String
}

type LoginEmployeeResponse {
  access_token: String
  refresh_token: String
  employee: LoginEmployee
  message: String
}

type MessageResponse{
message: String
}

# INPUTS


input AddEmployeeInput {
  name: String!
  phone_no: String!
  birth_date: Date!
  gender: String!
  description: String!
  hobbies: String!
  education: String!
  password: String!
  file: Upload
}

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

input UserLoginInput {
  email: String
  password: String
}
  input UserAddInput {
  username: String
  email: String
  password: String
}

input LoginEmployeeInput {
  phone_no: String!
  password: String!
}

# QUERY

type Query {
  # Employee Queries
  getAllEmployees: [Employee]
  getEmployeebyId(id: String): Employee
  # User Query
  getAllusers: [User]
}

# MUTATION

type Mutation {
  # Employee Mutations
  addEmployee(input: AddEmployeeInput!): MessageResponse
  updateEmployee(id: String, input: UpdateEmployeeInput!): MessageResponse
  deleteEmployee(id: String): MessageResponse
  employeeLogin(Employee_login_data: LoginEmployeeInput!): LoginEmployeeResponse
  EmployeeLogout: MessageResponse

  # User Mutations
  addUser(input: UserAddInput!): addUserResponse
  userLogin(USer_login_data: UserLoginInput!): LoginUserResponse
  userLogout: MessageResponse

  
  
}
`;
export { typeDefs };
