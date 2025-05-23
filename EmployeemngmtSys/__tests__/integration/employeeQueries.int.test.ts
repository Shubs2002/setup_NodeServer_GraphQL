import request from 'supertest';
import { createApolloApp } from '../../src/server'; // adjust path as needed

let app: any;

beforeAll(async () => {
  const serverInstance = await createApolloApp();
  app = serverInstance.app;
});

describe('GraphQL - getEmployee Integration', () => {
    describe("Get employee by ID", ()=>{

    
  it('should return employee details for a valid ID', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            getEmployeebyId(id: "1") {
              Eid
              EName
              Ephone
              Ebirth_date
              Egender
              Edescription
              Efile_path
              hobbies
              educations
            }
          }
        `,
      });

    const data = response.body.data.getEmployeebyId;

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('Eid', '1');
    expect(data).toHaveProperty('EName');
    expect(Array.isArray(data.hobbies)).toBe(true);
    expect(Array.isArray(data.educations)).toBe(true);
  });

  it('should return error when employee is not found', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            getEmployeebyId(id: "999999") {
              Eid
              EName
              Ephone
            }
          }
        `,
      });

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Employee not found');
    expect(response.body.data.getEmployeebyId).toBeNull(); // depending on GraphQL error handling
  });
  });

  describe("Get ALL Employees:", ()=>{
    it('should return a list of employees from the backend', async () => {
    const query = `
      query {
        getAllEmployees {
          Eid
          EName
          Ephone
          Ebirth_date
          Egender
          Edescription
          Efile_path
          hobbies
          educations
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();

    const employees = response.body.data.getAllEmployees;

    expect(Array.isArray(employees)).toBe(true);
    expect(employees.length).toBeGreaterThan(0);

    for (const emp of employees) {
      expect(emp).toHaveProperty('Eid');
      expect(emp).toHaveProperty('EName');
      expect(emp).toHaveProperty('Ephone');
      expect(emp).toHaveProperty('Ebirth_date');
      expect(emp).toHaveProperty('Egender');
      expect(emp).toHaveProperty('Edescription');
      expect(emp).toHaveProperty('Efile_path');
      expect(Array.isArray(emp.hobbies)).toBe(true);
      expect(Array.isArray(emp.educations)).toBe(true);
    }
  });
  })
});
