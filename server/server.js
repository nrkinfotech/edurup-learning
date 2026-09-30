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

const path = require('path');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend web pages (signup.html, dashboard.html, profile.html, etc.)
app.use(express.static(path.join(__dirname, '../')));

// Serve index.html on root route /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Edurup Learning Express Backend Server Running',
    database: 'MongoDB Connected'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 Edurup Backend Server Running on 0.0.0.0:${PORT}`);
  console.log(`====================================================`);
});
