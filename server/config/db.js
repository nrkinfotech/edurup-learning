const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edurup_learning');
    console.log(`🟢 MongoDB Compass Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (err) {
    console.error(`🔴 MongoDB Compass Connection Error: ${err.message}`);
    console.log('💡 Note: Make sure MongoDB Compass / mongod service is running locally on port 27017');
  }
};

module.exports = connectDB;
