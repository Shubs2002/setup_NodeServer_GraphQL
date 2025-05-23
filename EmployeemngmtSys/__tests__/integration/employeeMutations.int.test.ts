import request from 'supertest';
import { createApolloApp } from '../../src/server';

let app: any;
// let createdEmployeeId: string;
beforeAll(async () => {
    const serverInstance = await createApolloApp();
    app = serverInstance.app;
});


describe('GraphQL - Employee Mutations', () => {
    const generate10DigitNumber = () => {
        return `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    }
    describe("add Employee", () => {
        // Tests for Add Employee Starts

        const testEmployee = {
            "input": {
                "name": "Test Employee",
                "phone_no": generate10DigitNumber(),
                "birth_date": "2002-05-28",
                "gender": "male",
                "description": "Hey test",
                "hobbies": "Cooking,Dancing,Drawing",
                "education": "High School,Masters",
                "password": "Shubham@2002"
            },
        };
        const mutation = `
            mutation AddEmployee($input: AddEmployeeInput!) {
                addEmployee(input: $input) {
                    message
                }
            }
            `


        it("Should be able to create a Employee Successfully", async () => {

            const response = await request(app).post('/graphql').send({ query: mutation, variables: testEmployee })
            // console.log(JSON.stringify(response.body, null, 2));
            expect(response.status).toBe(200);
            expect(response.body.data.addEmployee.message).toBe("Employee created successfully")
            // single testcase ends for add employee
        });

        it("Should Fail As the Phone number is Already Present.", async () => {
            // test starts

            const response = await request(app).post('/graphql').send({ query: mutation, variables: testEmployee })
            // console.log(JSON.stringify(response.body, null, 2));
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].message).toBe('Phone number already exists')

            // test Ends 
        });
        describe("Should fails if any of the field is missing", () => {
            // Test Suit starts

            it("fails as name not present", async () => {
                // test for name starts
                const inputwithoutname = { ...testEmployee.input, name: "", phone_no: generate10DigitNumber() }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutname } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Name is required and must contain only alphabetic characters')
                // test for name Ends
            });

            it("fails as phone number is not present", async () => {
                // test for phone No starts
                const inputwithoutphoneNo = { ...testEmployee.input, phone_no: "" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutphoneNo } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Phone number is required and must be 10 numeric characters')
                // test for phone No Ends
            });

            it("fails as date of birth is required", async () => {
                // test for birthdate starts
                const inputwithoutBirthDate = { ...testEmployee.input, birth_date: "" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutBirthDate } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Birth date is required')
                // test for birthdate Ends
            })

            it("fails as Gender is required", async () => {
                // test for Gender starts
                const inputwithoutGender = { ...testEmployee.input, gender: "" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutGender } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Gender is required')
                // test for Gender Ends
            })

            it("fails as Description is required", async () => {
                // test for Description starts
                const inputwithoutDescription = { ...testEmployee.input, description: "" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutDescription } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Description is required')
                // test for Description Ends
            })

            it("fails as Password is required", async () => {
                // test for Password starts
                const inputwithoutPassword = { ...testEmployee.input, password: "" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutPassword } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Password is required!')
                // test for Password Ends
            })

            it("fails as Hobbies is required", async () => {
                // test for Hobbies starts
                const inputwithoutHobbies = { ...testEmployee.input, hobbies: "" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutHobbies } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Hobbies are required')
                // test for Hobbies Ends
            })

            it("fails as Education is required", async () => {
                // test for Education starts
                const inputwithoutEducation = { ...testEmployee.input, education: "" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutEducation } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Education is required')
                // test for Education Ends
            })

            it("fails as Birthdate must be in the format of YYYY-MM-DD", async () => {
                // test for InvalidBirthDate starts
                const inputwithoutInvalidBirthDate = { ...testEmployee.input, birth_date: "01-2002-12" }
                const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: inputwithoutInvalidBirthDate } });
                expect(response.body.errors).toBeDefined();
                expect(response.body.errors[0].message).toBe('Birth date must be in the format YYYY-MM-DD')
                // test for InvalidBirthDate Ends
            })
            // test suit ends
        });
        // Testing for add employee ends 
    });

    describe("Login Employee", () => {
        // Test suit for login employee starts
        const testEmployee = {
            "employeeLoginData": { "phone_no": "1234567859", "password": "Shubham@2002" }
        }
        const mutation = `
        mutation Mutation($employeeLoginData: LoginEmployeeInput!) {
            employeeLogin(Employee_login_data: $employeeLoginData) {
                access_token
                refresh_token
                employee {
                    id
                    name
                }
                message
                }
            }
        `
        it("Employee Logs in sucessfully with correct credentials", async () => {
            // Success in employee login Starts
            const response = await request(app).post('/graphql').send({ query: mutation, variables: { employeeLoginData: testEmployee.employeeLoginData } });
            expect(response.status).toBe(200);
            expect(response.body.data.employeeLogin.message).toBe("Employee login successful")
            expect(response.body.data.employeeLogin).toHaveProperty('access_token')
            expect(response.body.data.employeeLogin).toHaveProperty('refresh_token')
            expect(response.body.data.employeeLogin).toHaveProperty('employee')
            // Success in employee login Ends
        });

        it("Employee Login fails due to invalid credentials", async () => {
            // Fails in employee login with invalid creds Starts
            const testEmployeewithInvalidcredentials = { ...testEmployee.employeeLoginData, password: "wrongpassword" }
            const response = await request(app).post('/graphql').send({ query: mutation, variables: { employeeLoginData: testEmployeewithInvalidcredentials } });
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].message).toBe('Invalid phone number or password')
            // Fails in employee login with invalid creds Ends
        });

        it("Employee Login fails due to invalid credentials", async () => {
            // Fails in employee login with Empty creds Starts
            const response = await request(app).post('/graphql').send({ query: mutation, variables: { employeeLoginData: { "phone_no": "", "password": "" } } });
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].message).toBe('Phone number and password are required')
            // Fails in employee login with Empty creds Ends
        });
        // Test suit for login employee Ends 
    });
    describe("Employee Logouts", () => {
        // Employee can always logs out 
        const mutation = `
            mutation EmployeeLogout {
                EmployeeLogout {
                    message
                }
            }
            `;
        it("Employee LogsOut Successfully ", async () => {
            // Test for Logs out starts
            const response = await request(app).post('/graphql').send({ query: mutation });
            expect(response.body.data.EmployeeLogout.message).toBe("Employee logged out successfully")
            // Test for Logs out Ends
        });
    });

    describe("Deletes employee successfully", () => {
        const mutation = `
            mutation DeleteEmployee($deleteEmployeeId: String) {
                deleteEmployee(id: $deleteEmployeeId) {
                    message
                }
            }`;
        const deleteEmployeeId = {
            "deleteEmployeeId": "114"
        }
        // Tests for deleting a employee Starts
        it("Successfully deleting a employee", async () => {
            // Test Starts
            const response = await request(app).post('/graphql').send({ query: mutation, variables: deleteEmployeeId });
            expect(response.body.data.deleteEmployee.message).toBe(`Employee with ID ${deleteEmployeeId.deleteEmployeeId} deleted successfully`);
            // Test Ends
        })

        it("Fails to Delete Employee due to Invalid Employee ID", async () => {
            // Test Starts
            const response = await request(app).post('/graphql').send({ query: mutation, variables: deleteEmployeeId });
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].message).toBe('Employee not found')
            // Test Ends
        })
        // Tests for deleting a employee Ends
    });

    describe("Updating Employee", () => {
        // Employee Updation Starts
        const mutation = `mutation Mutation($input: UpdateEmployeeInput!, $updateEmployeeId: String) {
                                updateEmployee(input: $input, id: $updateEmployeeId) {
                                        message
                                }
                        }`;
        const UpdatedInput = {
            "updateEmployeeId": "96",
            "input": {
                "phone_no": generate10DigitNumber(),
                "name": "Updated TEst Emp bygql",
                "hobbies": "Cooking,Dancing",
                "gender": "female",
                "education": "Bachelor",
                "description": "Updated desc",
                "birth_date": "2022-05-09"
            }
        }
        it("Successfully Updates the Employees", async () => {
            // Test Starts
            const response = await request(app).post('/graphql').send({ query: mutation, variables: { input: UpdatedInput.input, updateEmployeeId: UpdatedInput.updateEmployeeId } });
            expect(response.body.data.updateEmployee.message).toBe(`Employee updated successfully`);
            // Test Ends
        });

      
        // Employee Updation Ends
    });

    // Employee Mutation ends 
});