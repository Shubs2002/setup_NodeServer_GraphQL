import axios from 'axios'

export const userLogin =async (_: any, args: {USer_login_data:{email:string; password:string}}) => {
    try{
        const response = await axios.post('http://127.0.0.1:5000/login', args.USer_login_data)
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
        const response = await axios.post('http://127.0.0.1:5000/logout');
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
        const response = await axios.post('http://127.0.0.1:5000/create-user', args.input)
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