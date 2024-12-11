require('dotenv').config();

const express = require('express');
const pool = require('./db'); // Import the database connection
const users = require('./users'); 
const dreams = require('./dreams');
const dreamFragments = require('./dream_fragments');
const comments = require('./comments'); 
const app = express();
const port = process.env.PORT || 5000; 

// ... your existing routes

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});