const pool = require('./db');

const getDreams = async () => {
  try {
    const result = await pool.query('SELECT * FROM dreams');
    return result.rows;
  } catch (error) {
    console.error('Error fetching dreams:', error);
    throw error;
  }
};

// Add functions for creating dreams, getting dreams by user ID, etc.

module.exports = {
  getDreams,
  // ... other dream-related functions
};