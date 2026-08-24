const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather by city name
router.get('/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log('REAL ERROR:', error.response?.data || error.message);
    res.status(400).json({ error: 'City not found' });
  }
});

// Get 5-day forecast
router.get('/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Forecast data unavailable' });
  }
});

module.exports = router;