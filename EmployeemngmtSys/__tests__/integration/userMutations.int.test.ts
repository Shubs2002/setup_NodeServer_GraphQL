import request from 'supertest';
import { createApolloApp } from '../../src/server'; // Adjust the path to your app

let app: any;

beforeAll(async () => {
  const serverInstance = await createApolloApp();
  app = serverInstance.app;
});

describe('GraphQL - User Auth Integration', () => {
  const genrateRandEmailId =() =>{
    const randdigit = Math.floor(10000 + Math.random() * 90000);
    return `testuser-${randdigit}@testmail.com`;

  }
  const testUser = {
    username: 'testuser',
    email: genrateRandEmailId(),
    password: 'testpassword123',
  };

  describe('addUser Mutation', () => {
    it('should create a new user successfully', async () => {
      const mutation = `
        mutation {
          addUser(input: {
            username: "${testUser.username}",
            email: "${testUser.email}",
            password: "${testUser.password}"
          }) {
            message
            user {
              username
              email
            }
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });

      expect(response.status).toBe(200);
      const userData = response.body.data.addUser;
      expect(userData.user.username).toBe(testUser.username);
      expect(userData.user.email).toBe(testUser.email);
    });

    it('should fail if email already exists', async () => {
      const mutation = `
        mutation {
          addUser(input: {
            username: "testuser2",
            email: "${testUser.email}",
            password: "anotherpass"
          }) {
            user {
              username
            }
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe('Email already exists');
    });

    it('should fail if any fields are empty', async () => {
      const mutation = `
        mutation {
          addUser(input: {
            username: "",
            email: "",
            password: ""
          }) {
            user {
              username
            }
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe('Username, email, and password are required');
    });

    it('should fail if any fields are empty', async () => {
      const mutation = `
        mutation {
          addUser(input: {
            username: "test",
            email: "test@gmail2.com",
            password: "smpaas"
          }) {
            user {
              username
            }
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe('Password must be at least 8 characters long');
    });



  });

  describe('userLogin Mutation', () => {
    it('should log in successfully with valid credentials', async () => {
      const mutation = `
        mutation {
          userLogin(USer_login_data: {
            email: "${testUser.email}",
            password: "${testUser.password}"
          }) {
            message
            user {
              username
            }
            access_token
            refresh_token
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });

      expect(response.status).toBe(200);
      const loginData = response.body.data.userLogin;

      expect(loginData.message).toBe('Login successful');
      expect(loginData.user.username).toBe(testUser.username);
      expect(loginData.access_token).toBeDefined();
      expect(loginData.refresh_token).toBeDefined();
    });

    it('should fail with invalid credentials', async () => {
      const mutation = `
        mutation {
          userLogin(USer_login_data: {
            email: "${testUser.email}",
            password: "wrongpassword"
          }) {
            message
            user {
              username
            }
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe('Invalid email or password');
    });

      it('should fail with invalid credentials', async () => {
      const mutation = `
        mutation {
          userLogin(USer_login_data: {
            email: "",
            password: ""
          }) {
            message
            user {
              username
            }
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });
    //   expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe('Email and password are required');
    });

  });

  describe('userLogout Mutation', () => {
    it('should log out successfully', async () => {
      const mutation = `
        mutation {
          userLogout {
            message
          }
        }
      `;

      const response = await request(app).post('/graphql').send({ query: mutation });

      expect(response.status).toBe(200);
      const logoutData = response.body.data.userLogout;
      expect(logoutData.message).toBe('Logout successful');
    });
  });
});
