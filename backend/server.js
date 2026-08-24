const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

console.log('API Key loaded:', process.env.OPENWEATHER_API_KEY ? 'YES ✓' : 'NO ✗');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const weatherRoutes = require('./routes/weather');

// Use routes
app.use('/api/weather', weatherRoutes);

// Root endpoint - Server health check
app.get('/', (req, res) => {
  res.json({ message: 'Weather App Backend Server Running ✓' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});