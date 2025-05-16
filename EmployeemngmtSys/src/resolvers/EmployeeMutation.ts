import axios from "axios";
export const employeeLogin = async (_: any, args: { Employee_login_data:{phone_no: string; password: string} }) => {
  try{
    const response = await axios.post('http://127.0.0.1:5000/login-emp',args.Employee_login_data);
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
    const response = await axios.post('http://127.0.0.1:5000/logout-emp')
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

export const addEmployee = async (_: any, args: { input: { name: string; phone_no: string; birthDate:Date; gender: string; description: string; hobbies:String; education: string; password: string; file: any; } }) => {

  try{
    const response = await axios.post('http://127.0.0.1:5000/createEmployee', args.input, {
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
    const response = await axios.put(`http://127.0.0.1:5000/update-employee/${args.id}`, args.input)
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
    const response = await axios.delete(`http://127.0.0.1:5000/delete-employee/${args.id}`)
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