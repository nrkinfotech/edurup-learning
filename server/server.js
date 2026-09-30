const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Global safety handlers to prevent process exits on cloud servers
process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception:', err ? err.message : err);
});

process.on('unhandledRejection', (reason) => {
  console.error('⚠️ Unhandled Promise Rejection:', reason ? (reason.message || reason) : reason);
});

// Load environment variables
dotenv.config();

// Connect to MongoDB
try {
  connectDB();
} catch(err) {
  console.error('MongoDB connection init notice:', err.message);
}

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

// Health check endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Edurup Learning Express Backend Server Active',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Edurup Learning Express Backend Server Running',
    database: 'MongoDB Connected'
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Edurup Backend Server Running on http://localhost:${PORT}`);
  console.log(`📊 Local MongoDB Compass URI: mongodb://127.0.0.1:27017/edurup_learning`);
  console.log(`====================================================`);
});
