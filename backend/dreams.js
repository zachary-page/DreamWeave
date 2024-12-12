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

const createDream = async (userId, dreamText) => {
  // Debug: Log the user ID to console
  console.log('Creating dream for user ID:', userId);

  try {
    if (!userId) {
      console.error('Error: User ID is missing or invalid.');
      throw new Error('User ID is missing or invalid.'); 
    }

    const result = await pool.query(
      'INSERT INTO dreams (user_id, dream_text, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [userId, dreamText]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating dream:', error);
    throw error;
  }
};

module.exports = {
  getDreams,
  createDream,
};