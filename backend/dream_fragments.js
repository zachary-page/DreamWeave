const pool = require('./db');

const getDreamFragments = async () => {
  try {
    const result = await pool.query('SELECT * FROM dream_fragments');
    return result.rows;
  } catch (error) {
    console.error('Error fetching dream fragments:', error);
    throw error;
  }
};

// Add functions for creating dream fragments, getting fragments by dream ID, etc.

module.exports = {
  getDreamFragments,
  // ... other dream_fragments-related functions
};