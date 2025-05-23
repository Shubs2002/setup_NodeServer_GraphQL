import axios from 'axios';
import { getAllEmployees, getEmployeebyId } from '../EmployeeQueries'; // adjust path
import dotenv from 'dotenv'

let envFile = '.env'; // default to development

if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}
dotenv.config({ path: envFile });
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Employee Query Resolvers', () => {
    describe('getAllEmployees', () => {
        it('should return mapped employees from backend', async () => {
            const mockResponse = {
                data: [
                    {
                        id: '1',
                        name: 'Alice',
                        phone_no: '1234567890',
                        birth_date: '1990-01-01',
                        gender: 'Female',
                        description: 'Developer',
                        file_path: '/path/to/file',
                        hobbies: ['Reading', 'Gaming'],
                        education: ['BSc', 'MSc'],
                    },
                    {
                        id: '2',
                        name: 'John',
                        phone_no: '1144552638',
                        birth_date: '1990-01-01',
                        gender: 'male',
                        description: 'Developer',
                        file_path: '/path/to/file',
                        hobbies: ['Reading', 'Gaming'],
                        education: ['Bachleor', 'High School'],
                    },
                ],
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await getAllEmployees();

            expect(result).toEqual([
                {
                    Eid: '1',
                    EName: 'Alice',
                    Ephone: '1234567890',
                    Ebirth_date: '1990-01-01',
                    Egender: 'Female',
                    Edescription: 'Developer',
                    Efile_path: '/path/to/file',
                    hobbies: ['Reading', 'Gaming'],
                    educations: ['BSc', 'MSc'],
                },
                {
                    Eid: '2',
                    EName: 'John',
                    Ephone: '1144552638',
                    Ebirth_date: '1990-01-01',
                    Egender: 'male',
                    Edescription: 'Developer',
                    Efile_path: '/path/to/file',
                    hobbies: ['Reading', 'Gaming'],
                    educations: ['Bachleor', 'High School'],
                },
            ]);

            expect(mockedAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/employees');
        });
        it('should throw an error if no employees are found (404)', async () => {
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    status: 404,
                    data: { error: 'No employees found' }
                }
            });

            await expect(getAllEmployees()).rejects.toThrow('No employees found');
        });

        it('should throw error on failure', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

            await expect(getAllEmployees()).rejects.toThrow('Graphql Failed to fetch employees from the backend.');
        });
    });

    describe('getEmployeebyId', () => {
        it('should return a mapped employee by id', async () => {
            const mockResponse = {
                data: {
                    id: 2,
                    name: 'Bob',
                    phone_no: '0987654321',
                    birth_date: '1995-01-01',
                    gender: 'Male',
                    description: 'Designer',
                    file_path: '/path/to/file2',
                    hobbies: ['Drawing'],
                    education: ['BA'],
                },
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await getEmployeebyId(null, { id: '2' });

            expect(result).toEqual({
                Eid: '2',
                EName: 'Bob',
                Ephone: '0987654321',
                Ebirth_date: '1995-01-01',
                Egender: 'Male',
                Edescription: 'Designer',
                Efile_path: '/path/to/file2',
                hobbies: ['Drawing'],
                educations: ['BA'],
            });

            expect(mockedAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/employee/2');
        });


        it('should throw an error if no employees are found (404)', async () => {
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    status: 404,
                    data: { error: 'No employees found' }
                }
            });

            await expect(getEmployeebyId(null, { id: '99' })).rejects.toThrow('No employees found');
        });
        it('should throw generic error if backend response is not available', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Timeout'));

            await expect(getEmployeebyId(null, { id: '999' })).rejects.toThrow(
                'Graphql Failed to fetch employee from the backend.'
            );
        });
    });
});
