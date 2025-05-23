import axios from "axios";
import dotenv from 'dotenv'

let envFile = '.env'; // default to development

if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}
dotenv.config({ path: envFile });
export const employeeLogin = async (_: any, args: { Employee_login_data:{phone_no: string; password: string} }) => {
  try{
    const response = await axios.post(`${process.env.URL_EMPLOYEE_LOGIN}`,args.Employee_login_data);
    return response.data;

  }
  catch(error: any){
    if (error.response && error.response.data && error.response.data.error) {
      // console.error('Backend error:', error.response.data.error);
      throw new Error(error.response.data.error); // Throw the backend error message
    }
    // console.error('Error fetching employee:', error);
    throw new Error('Graphql Failed to Login Employee from the backend.');
  }
}

export const EmployeeLogout = async () =>{
  try{
    const response = await axios.post(`${process.env.URL_EMPLOYEE_LOGOUT}`)
    return response.data;
  }
  catch(error: any){
    if (error.response && error.response.data && error.response.data.error) {
      // console.error('Backend error:', error.response.data.error);
      throw new Error(error.response.data.error); // Throw the backend error message
    }
    // console.error('Error fetching employee:', error);
    throw new Error('Graphql Failed to Logout employee from the backend.');
  }
}

export const addEmployee = async (_: any, args: { input: { name: string; phone_no: string; birthDate:Date; gender: string; description: string; hobbies:string; education: string; password: string; file: any; } }) => {

  try{
    const response = await axios.post(`${process.env.URL_EMPLOYEE_CREATE}`, args.input, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
    return response.data;
  }
  catch(error:any){
    if (error.response && error.response.data && error.response.data.error) {
      // console.error('Backend error:', error.response.data.error);
      throw new Error(error.response.data.error); // Throw the backend error message
    }
    // console.error('Error fetching employee:', error);
    throw new Error('Graphql Failed to add employee from the backend.');
  }
}

export const updateEmployee = async (_:any, args: { id: string; input: { name: string; phone_no: string; birth_date: Date; gender: string; description: string; hobbies: string; education: string; }}) =>{
  try{
    const response = await axios.put(`${process.env.URL_EMPLOYEE_UPDATE}/${args.id}`, args.input)
    return response.data;
  }
  catch(error:any){
    if (error.response && error.response.data && error.response.data.error) {
      // console.error('Backend error:', error.response.data.error);
      throw new Error(error.response.data.error); // Throw the backend error message
    }
    // console.error('Error updating employee:', error);
    throw new Error('Graphql Failed to update employee from the backend.');
  }
}

export const deleteEmployee = async (_:any, args : {id:string} ) => {
  try{
    const response = await axios.delete(`${process.env.URL_EMPLOYEE_DELETE}/${args.id}`)
    return response.data;
  }
  catch(error:any){
    if (error.response && error.response.data && error.response.data.error) {
      // console.error('Backend error:', error.response.data.error);
      throw new Error(error.response.data.error); // Throw the backend error message
    }
    // console.error('Error fetching employee:', error);
    throw new Error('Graphql Failed to delete employee from the backend.');
  }
}