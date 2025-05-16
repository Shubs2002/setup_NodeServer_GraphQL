import axios from 'axios';
export const getAllEmployees = async () => {
    try {
        // Fetch data from the Flask backend
        const response = await axios.get('http://127.0.0.1:5000/employees');
        const employees = response.data;
        // Map the response to match the GraphQL schema
        return employees.map((employee) => ({
            Eid: employee.id.toString(),
            EName: employee.name,
            Ephone: employee.phone_no,
            Ebirth_date: employee.birth_date,
            Egender: employee.gender,
            Edescription: employee.description,
            Efile_path: employee.file_path,
            hobbies: employee.hobbies,
            educations: employee.education,
        }));
    }
    catch (error) {
        // console.error('Error fetching employees:', error);
        throw new Error('Graphql Failed to fetch employees from the backend.');
    }
};
export const getEmployeebyId = async (_, args) => {
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
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            // console.error('Backend error:', error.response.data.error);
            throw new Error(error.response.data.error); // Throw the backend error message
        }
        // console.error('Error fetching employee:', error);
        throw new Error('Graphql Failed to fetch employee from the backend.');
    }
};
