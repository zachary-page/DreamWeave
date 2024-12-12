const pool = require('./db'); // Import the database connection pool

const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0]; // Assuming you expect only one user with the given ID
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    return result.rowCount === 1; // Return true if a user was deleted
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};



// Add more functions for creating new users, updating user information, etc.

module.exports = {
  getUsers,
  getUserById,
  deleteUser
};