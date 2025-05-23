import axios from "axios";
import { userLogin, userLogout, addUser } from "../UserMutations";
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

describe("User Mutation resolvers Test", () => {
    describe("User tries to logs In", () => {

        const loginUrl = "http://127.0.0.1:5000/login";

        it("should log in successfully with correct credentials", async () => {
            const mockUser = {
                username: "Sample User"
            };

            const mockResponse = {
                data: {
                    message: "Login successful",
                    user: mockUser,
                    access_token: "This_is_my_access_Token",
                    refresh_token: "This_Is_My_Refresh_Token"
                }
            };

            mockedAxios.post.mockResolvedValueOnce(mockResponse);

            const result = await userLogin(null, {
                USer_login_data: { email: "test@example.com", password: "password123" }
            });

            expect(result).toEqual(mockResponse.data);
            expect(mockedAxios.post).toHaveBeenCalledWith(loginUrl, {
                email: "test@example.com",
                password: "password123"
            });
        });

        it("should throw an error for invalid credentials (401)", async () => {
            const mockError = {
                response: {
                    status: 401,
                    data: {
                        error: "Invalid email or password"
                    }
                }
            };

            mockedAxios.post.mockRejectedValueOnce(mockError);

            await expect(userLogin(null, {
                USer_login_data: { email: "wrong@example.com", password: "wrongpass" }
            })).rejects.toThrow("Invalid email or password");
        });

        it("should throw an error if email or password is missing (400)", async () => {
            const mockError = {
                response: {
                    status: 400,
                    data: {
                        error: "Email and password are required"
                    }
                }
            };

            mockedAxios.post.mockRejectedValueOnce(mockError);

            await expect(userLogin(null, {
                USer_login_data: { email: "", password: "" }
            })).rejects.toThrow("Email and password are required");
        });

        it("should throw generic error if axios fails unexpectedly", async () => {
            const mockError = new Error("Network Error");

            mockedAxios.post.mockRejectedValueOnce(mockError);

            await expect(userLogin(null, {
                USer_login_data: { email: "test@example.com", password: "password123" }
            })).rejects.toThrow("Graphql Failed to Login User from the backend.");
        });
    });
    describe("User Tries to logout", () => {
        const logoutuserUrl = "http://127.0.0.1:5000/logout"
        it("User should be able to logout successfully", async () => {
            const mockedResponse = {
                data: {
                    "message": "Logout successful"
                }
            }
            mockedAxios.post.mockResolvedValueOnce(mockedResponse)
            const result = await userLogout();
            expect(result).toEqual(mockedResponse.data);
            expect(mockedAxios.post).toHaveBeenCalledWith(logoutuserUrl);
        });
    });
    describe("User tries to create his/her profile", () => {
        const addUserUrl = "http://127.0.0.1:5000/create-user";
        it("Create profile with correct and availaible credentials", async () => {
            const mockedresponse = {
                data: {
                    status: 200,
                    "message": "User created successfully",
                    "user": {
                        "email": "Test@gmail.com",
                        "username": "The Testman"
                    }
                }
            };
            mockedAxios.post.mockResolvedValueOnce(mockedresponse);
            const result = await addUser(null, { input: { username: "The Testman", email: "Test@gmail.com", password: "Shubham@2002" } });
            expect(result).toEqual(mockedresponse.data)
            expect(mockedAxios.post).toHaveBeenCalledWith(addUserUrl, {
                username: "The Testman",
                email: "Test@gmail.com",
                password: "Shubham@2002"
            });
        });

        it("tries to register with already present email address", async () => {
            const mockedResponse = {
                response: {
                    status: 400,
                    data: {
                        "error": "Email already exists"
                    },
                },
            };
            mockedAxios.post.mockRejectedValueOnce(mockedResponse)
            await expect(addUser(
                null, {
                input: {
                    username: "Already present",
                    email: "AlrPres@gmail.com",
                    password: "Shubham@2002"
                }
            })
            ).rejects.toThrow("Email already exists")
            expect(mockedAxios.post).toHaveBeenCalledWith("http://127.0.0.1:5000/create-user", {
                username: "Already present",
                email: "AlrPres@gmail.com",
                password: "Shubham@2002"
            });
            // expect(result).toEqual(mockedResponse.response)
        });
        it("tries to register with empty fields", async () => {
            const mockedResponse = {
                response: {
                    status: 400,
                    data: {
                        "error": "Username, email, and password are required"
                    },
                },
            };
            mockedAxios.post.mockRejectedValueOnce(mockedResponse)
            await expect(addUser(
                null, {
                input: {
                    username: "",
                    email: "",
                    password: ""
                }
            })
            ).rejects.toThrow("Username, email, and password are required")
            expect(mockedAxios.post).toHaveBeenCalledWith("http://127.0.0.1:5000/create-user", {
                username: "",
                email: "",
                password: ""
            });
            // expect(result).toEqual(mockedResponse.response)
        })

    });
    it("User chooses password with length < 8 charachters", async () => {
        const mockedResponse = {
            response: {
                status: 400,
                data: {
                    "error": "Password must be at least 8 characters long"
                },
            },
        };

        mockedAxios.post.mockRejectedValueOnce(mockedResponse)
        await expect(addUser(
            null, {
            input: {
                username: "correct username",
                email: "correct@user.com",
                password: "Sh@2002"
            }
        })
        ).rejects.toThrow("Password must be at least 8 characters long")
        expect(mockedAxios.post).toHaveBeenCalledWith("http://127.0.0.1:5000/create-user", {
            username: "correct username",
            email: "correct@user.com",
            password: "Sh@2002"
        });
    });
    it("should throw generic error if axios fails unexpectedly", async () => {
        const mockError = new Error("Network Error");

        mockedAxios.post.mockRejectedValueOnce(mockError);

        await expect(addUser(
            null, {
            input: {
                username: "correct username",
                email: "correct@user.com",
                password: "Shubham@2002"
            }
        })).rejects.toThrow("Graphql Failed to add User from the backend.")
    });
})