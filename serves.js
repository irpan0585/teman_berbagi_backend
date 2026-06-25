require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/database');

let isConnected = false;

async function connectDatabase() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log('✅ MongoDB Connected');
  }
}

module.exports = async (req, res) => {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error('❌ Server Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
