const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = require('./config/db');

// Initialize the Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allows our React frontend to communicate with this backend
app.use(express.json()); // Allows the server to accept JSON data in the body of requests

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('TaskFlow API is running!');
});

// Define the Port (use environment variable or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
