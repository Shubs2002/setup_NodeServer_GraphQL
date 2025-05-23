import request from 'supertest';
import { createApolloApp } from '../../src/server'; // adjust path as needed

let app: any;

beforeAll(async () => {
  const serverInstance = await createApolloApp();
  app = serverInstance.app;
});

describe('GraphQL - getAllUsers Integration', () => {
  it('should return a list of users from the backend', async () => {
    const query = `
      query {
        getAllusers {
          id
          username
          email
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();

    const users = response.body.data.getAllusers;

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);

    for (const user of users) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
    }
  });

  //     // You need to ensure your test DB is empty or mock this response
//   it('should return error if no users are found', async () => {
//     const query = `
//       query {
//         getAllusers {
//           id
//           username
//           email
//         }
//       }
//     `;

//     const response = await request(app)
//       .post('/graphql')
//       .send({ query });

//     expect(response.body.errors).toBeDefined();
//     expect(response.body.errors[0].message).toBe('No users found');
//     expect(response.body.data.getAllusers).toBeNull();
//   });
});