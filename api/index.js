const dotenv = require('dotenv');
const app = require('../src/app');
const connectDB = require('../src/config/db');

dotenv.config();

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return res.status(500).json({ message: 'Database connection error' });
  }
};
