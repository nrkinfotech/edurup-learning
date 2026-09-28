const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB Compass
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Edurup Learning Express Backend Server Running',
    database: 'MongoDB Compass (localhost:27017/edurup_learning)'
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Edurup Backend Server Running on http://localhost:${PORT}`);
  console.log(`📊 Local MongoDB Compass URI: mongodb://127.0.0.1:27017/edurup_learning`);
  console.log(`====================================================`);
});
