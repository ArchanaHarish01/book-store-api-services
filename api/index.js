const dotenv = require('dotenv');
const app = require('../src/app');
const connectDB = require('../src/config/db');

dotenv.config();

const shouldConnectDB = (url = '') => {
  return url.startsWith('/api/auth') || url.startsWith('/api/books');
};

module.exports = async (req, res) => {
  try {
    if (shouldConnectDB(req.url)) {
      await connectDB();
    }
    return app(req, res);
  } catch (error) {
    console.error('Request failed:', error.message);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ message: 'Internal server error' }));
  }
};
