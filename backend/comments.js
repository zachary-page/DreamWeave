const pool = require('./db');

const getComments = async () => {
  try {
    const result = await pool.query('SELECT * FROM comments');
    return result.rows;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Add functions for creating comments, getting comments by fragment ID, etc.

module.exports = {
  getComments,
  // ... other comment-related functions
};