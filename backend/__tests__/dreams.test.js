const pool = require('../db');
const dreams = require('../dreams');
const { registerUser } = require('../auth');

afterEach(async () => {
  try {
    // Delete all dreams
    await pool.query('DELETE FROM dreams');

    // Delete all users
    await pool.query('DELETE FROM users'); 

  } catch (error) {
    console.error('Error cleaning up test data:', error);
  }
});

describe('dreams', () => {
  it('should create a new dream', async () => {
    // Register a test user
    const { username, email } = await registerUser('testuser', 'test@example.com', 'password'); 

    // Find the user ID by querying the database
    const findUserQuery = 'SELECT id FROM users WHERE username = $1 AND email = $2';
    const findUserResult = await pool.query(findUserQuery, [username, email]);
    const userId = findUserResult.rows[0].id; 

    // Create a new dream
    const newDream = await dreams.createDream(userId, 'Test dream'); 

    expect(newDream).toHaveProperty('id'); // Check if the returned object has an ID
    expect(newDream.dream_text).toBe('Test dream'); 
  });
});