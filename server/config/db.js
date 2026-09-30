const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  const primaryUri = process.env.MONGO_URI;
  const fallbacks = [
    primaryUri,
    'mongodb://127.0.0.1:27017/edurup_learning',
    'mongodb://localhost:27017/edurup_learning',
    'mongodb://mongo:27017/edurup_learning',
    'mongodb://mongodb:27017/edurup_learning'
  ].filter(Boolean);

  for (const uri of fallbacks) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000
      });
      console.log(`🟢 MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
      return conn;
    } catch (err) {
      console.warn(`⚠️ MongoDB connection attempt failed for ${uri}: ${err.message}`);
    }
  }

  console.error('🔴 All MongoDB connection attempts failed. Please verify MONGO_URI in environment variables.');
};

module.exports = connectDB;
