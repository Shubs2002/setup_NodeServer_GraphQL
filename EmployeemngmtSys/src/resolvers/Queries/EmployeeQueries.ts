import axios from 'axios';
import dotenv from 'dotenv'

let envFile = '.env'; // default to development

if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}
dotenv.config({ path: envFile });

export const getAllEmployees = async () => {
  try {
    // Fetch data from the Flask backend
    const response = await axios.get(`${process.env.URL_EMPLOYEES_GET_ALL}`);
    const employees = response.data;

    // Map the response to match the GraphQL schema
    return employees.map((employee: any) => {return {
      Eid: employee.id.toString(),
      EName: employee.name,
      Ephone: employee.phone_no,
      Ebirth_date: employee.birth_date,
      Egender: employee.gender,
      Edescription: employee.description,
      Efile_path: employee.file_path,
      hobbies: employee.hobbies,
      educations: employee.education,
    }});
  } catch (error: any) {
     if (error.response && error.response.data && error.response.data.error) {
      // console.error('Backend error:', error.response.data.error);
      throw new Error(error.response.data.error); // Throw the backend error message
    }
    // console.error('Error fetching employees:', error);
    throw new Error('Graphql Failed to fetch employees from the backend. '+error);
  }
};




export const getEmployeebyId = async (_: any,args: {id:string}) => {
  try{
    const response = await axios.get(`${process.env.URL_EMPLOYEE_GET}/${args.id}`);
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
  }
  catch(error: any){
     if (error.response && error.response.data && error.response.data.error) {
      // console.error('Backend error:', error.response.data.error);
      throw new Error(error.response.data.error); // Throw the backend error message
    }
    // console.error('Error fetching employee:', error);
    throw new Error('Graphql Failed to fetch employee from the backend.');  
  }
}
