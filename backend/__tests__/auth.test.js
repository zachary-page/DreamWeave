const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { registerUser, loginUser } = require('../auth');

describe('auth.js', () => {
  beforeEach(async () => {
    try {
      // Delete all users before each test
      await pool.query('DELETE FROM users'); 
    } catch (error) {
      console.error('Error cleaning up test data:', error);
    }
  });

  it('should register a new user', async () => {
    const registeredUser = await registerUser('testuser1', 'test1@example.com', 'password123');
    expect(registeredUser).toHaveProperty('id');
    expect(registeredUser.username).toBe('testuser1');
    expect(registeredUser.email).toBe('test1@example.com');
  });

  it('should not register a user with existing username', async () => {
    await registerUser('testuser2', 'test2@example.com', 'password123');
    await expect(registerUser('testuser2', 'another@example.com', 'anotherpassword')).rejects.toThrow('Username or email already exists.');
  });

  it('should not register a user with existing email', async () => {
    await registerUser('testuser3', 'test3@example.com', 'password123');
    await expect(registerUser('anotheruser', 'test3@example.com', 'anotherpassword')).rejects.toThrow('Username or email already exists.');
  });

  it('should throw an error if username is missing', async () => {
    await expect(registerUser('', 'test4@example.com', 'password123')).rejects.toThrow('Username, email, and password are required.');
  });

  it('should throw an error if email is missing', async () => {
    await expect(registerUser('testuser5', '', 'password123')).rejects.toThrow('Username, email, and password are required.');
  });

  it('should throw an error if password is missing', async () => {
    await expect(registerUser('testuser6', 'test6@example.com', '')).rejects.toThrow('Username, email, and password are required.');
  });

  it('should login a user with valid credentials', async () => {
    const { userId } = await registerUser('testuser7', 'test7@example.com', 'password123');
    const loginResult = await loginUser('testuser7', 'password123');
    expect(loginResult).toHaveProperty('user');
    expect(loginResult).toHaveProperty('token');
  });

  it('should throw an error for invalid login credentials', async () => {
    const { userId } = await registerUser('testuser8', 'test8@example.com', 'password123'); 
    await expect(loginUser('testuser8', 'wrongpassword')).rejects.toThrow('Invalid password'); 
  });

  it('should throw an error for non-existent user', async () => {
    await expect(loginUser('nonexistentuser', 'anypassword')).rejects.toThrow('User not found'); 
  });
});