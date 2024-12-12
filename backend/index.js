require('dotenv').config();

const express = require('express');
const pool = require('./db'); // Import the database connection
const users = require('./users'); 
const dreams = require('./dreams');
const dreamFragments = require('./dream_fragments');
const comments = require('./comments'); 
const authMiddleware = require('./authMiddleware');
const adminMiddleware = require('./adminMiddleware');
const app = express();
const port = process.env.PORT || 5000; 


app.get('/', (req, res) => {
  res.send('Hello from DreamWeave Backend!');
});

app.get('/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json({ message: 'Connected to database!', time: result.rows[0].now });
    } catch (error) {
      res.status(500).json({ error: 'Error connecting to database' });
    }
  });

app.post('/api/dreams', authMiddleware, async (req, res) => {
  try {
    const { dream_text } = req.body; 
    const newDream = await dreams.createDream(req.user.userId, dream_text); 
    res.status(201).json(newDream); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to create dream' }); 
  }
});

app.post('/api/admin/users', adminMiddleware, async (req, res) => {
  try {
    const { username, email, password } = req.body; 
    const newUser = await users.registerUser(username, email, password); 
    res.status(201).json(newUser); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' }); 
  }
});

app.delete('/api/admin/users/:userId', adminMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const isDeleted = await users.deleteUser(userId);

    if (isDeleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});