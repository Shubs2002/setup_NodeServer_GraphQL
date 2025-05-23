import axios from 'axios';
import { employeeLogin, EmployeeLogout, addEmployee, updateEmployee, deleteEmployee } from '../EmployeeMutation';
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

describe('Employee Mutations', () => {

  describe('employeeLogin', () => {
    it('should login employee successfully', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          message: 'Employee login successful',
          employee: { id: '1', name: 'John' },
          access_token: 'token123',
          refresh_token: 'refreshToken123',
        },
      });

      const result = await employeeLogin(null, {
        Employee_login_data: { phone_no: '1234567890', password: 'pass' },
      });

      expect(result.message).toBe('Employee login successful');
      expect(result.employee.name).toBe('John');
    });

    it('should throw error for invalid credentials', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: { error: 'Invalid phone number or password' },
        },
      });

      await expect(
        employeeLogin(null, {
          Employee_login_data: { phone_no: '000', password: 'wrong' },
        })
      ).rejects.toThrow('Invalid phone number or password');
    });
  });

  describe('EmployeeLogout', () => {
    it('should logout employee successfully', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { message: 'Employee logged out successfully' },
      });

      const result = await EmployeeLogout();
      expect(result.message).toBe('Employee logged out successfully');
    });

    it('should throw error on logout failure', async () => {
      mockedAxios.post.mockRejectedValueOnce({});
      await expect(EmployeeLogout()).rejects.toThrow('Graphql Failed to Logout employee from the backend.');
    });
  });

  describe('addEmployee', () => {
  const baseInput = {
    name: 'Jane',
    phone_no: '9876543210',
    birthDate: new Date(),
    gender: 'female',
    description: 'desc',
    hobbies: 'Reading',
    education: 'Bachelors',
    password: 'password',
    file: new File(['dummy content'], 'profile.png'),
  };

  it('should add employee successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: 'Employee created successfully' },
    });

    const result = await addEmployee(null, { input: baseInput });
    expect(result.message).toBe('Employee created successfully');
  });

  it("should throw error if hobby doesn't exist", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: "Hobby 'Gaming' does not exist" } },
    });

    await expect(addEmployee(null, { input: baseInput })).rejects.toThrow(
      "Hobby 'Gaming' does not exist"
    );
  });

  it("should throw error if education doesn't exist", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: "Education 'Unknown' does not exist" } },
    });

    await expect(addEmployee(null, { input: baseInput })).rejects.toThrow(
      "Education 'Unknown' does not exist"
    );
  });

  it('should throw validation error if name is missing', async () => {
    const invalidInput = { ...baseInput, name: '' };

    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'Name is required' } },
    });

    await expect(addEmployee(null, { input: invalidInput })).rejects.toThrow('Name is required');
  });

  it('should throw error if backend fails unexpectedly', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Server crashed'));

    await expect(addEmployee(null, { input: baseInput })).rejects.toThrow('Graphql Failed to add employee from the backend.');
  });

  it('should throw error if file upload fails', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'File upload failed' } },
    });

    await expect(addEmployee(null, { input: baseInput })).rejects.toThrow('File upload failed');
  });
});


describe('updateEmployee', () => {
  const baseUpdateInput = {
    name: 'Jane Updated',
    phone_no: '1112223333',
    birth_date: new Date(),
    gender: 'female',
    description: 'Updated bio',
    hobbies: 'Writing',
    education: 'Masters',
  };

  it('should update employee successfully', async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: { message: 'Employee updated successfully' },
    });

    const result = await updateEmployee(null, { id: '1', input: baseUpdateInput });
    expect(result.message).toBe('Employee updated successfully');
  });

  it("should fail if education doesn't exist", async () => {
    mockedAxios.put.mockRejectedValueOnce({
      response: { data: { error: "Education 'FakeDegree' does not exist" } },
    });

    await expect(updateEmployee(null, { id: '1', input: baseUpdateInput })).rejects.toThrow(
      "Education 'FakeDegree' does not exist"
    );
  });

  it("should fail if hobby doesn't exist", async () => {
    mockedAxios.put.mockRejectedValueOnce({
      response: { data: { error: "Hobby 'Surfing' does not exist" } },
    });

    await expect(updateEmployee(null, { id: '1', input: baseUpdateInput })).rejects.toThrow(
      "Hobby 'Surfing' does not exist"
    );
  });

  it('should fail if employee not found', async () => {
    mockedAxios.put.mockRejectedValueOnce({
      response: { data: { error: 'Employee not found' } },
    });

    await expect(updateEmployee(null, { id: '999', input: baseUpdateInput })).rejects.toThrow(
      'Employee not found'
    );
  });

  it('should throw validation error if phone number is invalid', async () => {
    const invalidInput = { ...baseUpdateInput, phone_no: 'abc123' };

    mockedAxios.put.mockRejectedValueOnce({
      response: { data: { error: 'Invalid phone number format' } },
    });

    await expect(updateEmployee(null, { id: '1', input: invalidInput })).rejects.toThrow(
      'Invalid phone number format'
    );
  });

  it('should throw error if backend fails', async () => {
    mockedAxios.put.mockRejectedValueOnce(new Error('Internal Server Error'));

    await expect(updateEmployee(null, { id: '1', input: baseUpdateInput })).rejects.toThrow(
      'Graphql Failed to update employee from the backend.'
    );
  });
});

describe('deleteEmployee', () => {
  it('should delete employee successfully', async () => {
    mockedAxios.delete.mockResolvedValueOnce({
      data: { message: 'Employee with ID 1 deleted successfully' },
    });

    const result = await deleteEmployee(null, { id: '1' });
    expect(result.message).toBe('Employee with ID 1 deleted successfully');
  });

  it('should throw error if employee does not exist', async () => {
    mockedAxios.delete.mockRejectedValueOnce({
      response: { data: { error: 'Employee not found' } },
    });

    await expect(deleteEmployee(null, { id: '999' })).rejects.toThrow('Employee not found');
  });

  it('should throw error if ID is invalid format', async () => {
    mockedAxios.delete.mockRejectedValueOnce({
      response: { data: { error: 'Invalid ID format' } },
    });

    await expect(deleteEmployee(null, { id: 'abc' })).rejects.toThrow('Invalid ID format');
  });

  it('should throw error if backend crashes', async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error('Server error'));

    await expect(deleteEmployee(null, { id: '1' })).rejects.toThrow('Graphql Failed to delete employee from the backend.');
  });
});


});
