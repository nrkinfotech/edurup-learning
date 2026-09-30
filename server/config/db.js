const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edurup_learning';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`🟢 MongoDB Compass Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (err) {
    console.error(`🔴 MongoDB Compass Connection Error: ${err.message}`);
    console.log('💡 Note: Make sure MongoDB Compass / mongod service is running locally on port 27017');
    
    // Attempt fallback to localhost if 127.0.0.1 fails
    if (uri.includes('127.0.0.1')) {
      try {
        const conn2 = await mongoose.connect('mongodb://localhost:27017/edurup_learning', {
          serverSelectionTimeoutMS: 5000
        });
        console.log(`🟢 MongoDB Compass Connected via localhost: ${conn2.connection.host}`);
      } catch (err2) {
        console.error(`🔴 Fallback localhost connection also failed: ${err2.message}`);
      }
    }
  }
};

module.exports = connectDB;
