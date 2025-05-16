import axios from 'axios';
export const getAllusers = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/users');
        return response.data.map((user) => ({
            id: user.id.toString(),
            username: user.username,
            email: user.email,
        }));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            // console.error('Backend error:', error.response.data.error);
            throw new Error(error.response.data.error); // Throw the backend error message
        }
        // console.error('Error fetching users:', error);
        throw new Error('Graphql Failed to fetch users from the backend.');
    }
};
