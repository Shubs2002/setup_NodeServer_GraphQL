import { getAllusers } from "../UserQuries";
import axios from "axios";
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

describe("User Queries Resolver", () => {
    describe("Get All Users", () => {
        it("Should return a list of all users from backend with status code 200", async () => {
            const mockResponses = {
                status: 200,
                data: [
                    {
                        id: '1',
                        username: 'Sample USer1',
                        email: 'SampleUser1@gmail.com',
                        password: 'Shubham@2002'
                    },

                    {
                        id: '2',
                        username: 'Sample USer2',
                        email: 'SampleUser2@gmail.com',
                        password: 'Shubham@2002'
                    },

                ],
            };
            mockedAxios.get.mockResolvedValueOnce(mockResponses);
            const result = await getAllusers();
            expect(result).toEqual([
                {
                    id: '1',
                    username: 'Sample USer1',
                    email: 'SampleUser1@gmail.com',    
                },

                {
                    id: '2',
                    username: 'Sample USer2',
                    email: 'SampleUser2@gmail.com',
                },
            ]);
            expect(mockedAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/users');

        });
        it("Should throw Error if no users are found", async () => {

            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    status: 404,
                    data: { error: "No users found" }
                },
            });
            await expect(getAllusers()).rejects.toThrow("No users found");
        });

        it("Generates a network error to thus graphql throws a error rathe rthan backend this can be due to bakcend server might be offline", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

            await expect(getAllusers()).rejects.toThrow('Graphql Failed to fetch users from the backend.')

        }
        );

    });

});