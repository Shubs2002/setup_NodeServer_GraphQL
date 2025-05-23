import axios from 'axios'
import dotenv from 'dotenv'

let envFile = '.env'; // default to development

if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}
dotenv.config({ path: envFile });
export const userLogin =async (_: any, args: {USer_login_data:{email:string; password:string}}) => {
    try{
        const response = await axios.post(`${process.env.URL_USER_LOGIN}`, args.USer_login_data)
        return response.data;
    }
    catch(error: any){
        if (error.response && error.response.data && error.response.data.error) {
            // console.error('Backend error:', error.response.data.error);
            throw new Error(error.response.data.error); // Throw the backend error message
        }
        // console.error('Error Logging In User:', error);
        throw new Error('Graphql Failed to Login User from the backend.');
    }
}

export const userLogout = async () =>{
    try{
        const response = await axios.post(`${process.env.URL_USER_LOGOUT}`);
        return response.data;
    }
    catch(error:any){
        if (error.response && error.response.data && error.response.data.error) {
            // console.error('Backend error:', error.response.data.error);
            throw new Error(error.response.data.error); // Throw the backend error message
        }
        // console.error('Error Logging Out User:', error);
        throw new Error('Graphql Failed to Logout User from the backend.');
    }
}

export const addUser = async (_: any, args: {input: {username:string; email:string; password:string}}) => {
    try{
        const response = await axios.post(`${process.env.URL_USER_CREATE}`, args.input)
        return response.data;
    }
    catch(error: any){
        if (error.response && error.response.data && error.response.data.error) {
            // console.error('Backend error:', error.response.data.error);
            throw new Error(error.response.data.error); // Throw the backend error message
        }
        // console.error('Error Adding User:', error);
        throw new Error('Graphql Failed to add User from the backend.');
    }
}