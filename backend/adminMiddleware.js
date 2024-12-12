const pool = require('./db');

const adminMiddleware = async (req, res, next) => {
  try {
    // For this example, we'll assume only a user with a specific ID (e.g., 1) is an admin
    const adminUserId = 1; 

    if (req.user && req.user.userId === adminUserId) {
      next(); // Allow access to the route
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.error('Error checking admin privileges:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = adminMiddleware;