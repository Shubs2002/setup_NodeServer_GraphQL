import axios from 'axios'
import dotenv from 'dotenv'

let envFile = '.env'; // default to development

if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}
dotenv.config({ path: envFile });
export const getAllusers = async () => {
    try{
        const response = await axios.get(`${process.env.URL_USERS_GET_ALL}`)
        return response.data.map((user:any)=> {return {
            id: user.id.toString(),
            username: user.username,
            email: user.email,
        }})

    }
    catch(error: any){
        if (error.response && error.response.data && error.response.data.error) {
            // console.error('Backend error:', error.response.data.error);
            throw new Error(error.response.data.error); // Throw the backend error message
        }        
        // console.error('Error fetching users:', error);
        throw new Error('Graphql Failed to fetch users from the backend.');
    }
}   