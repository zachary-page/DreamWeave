const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const registerUser = async (username, email, password) => {
    try {
        // Validate input
        if (!username || !email || !password) {
            throw new Error('Username, email, and password are required.');
        }

        // Check if user with the same username or email already exists
        const existingUserResult = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUserResult.rows.length > 0) {
            throw new Error('Username or email already exists.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Insert user into the database
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        return result.rows[0]; // Return the newly created user object
    } catch (error) {
        if (error.code === '23505') { // Handle unique constraint violation (PostgreSQL specific)
            throw new Error('Username or email already exists.');
        }
        throw error;
    }
};

const loginUser = async (usernameOrEmail, password) => {
    try {
        // Find the user by username or email
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $1';
        const result = await pool.query(query, [usernameOrEmail]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('User not found');
        }

        // Compare provided password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { user, token };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser,
};