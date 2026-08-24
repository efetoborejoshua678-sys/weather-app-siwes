import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await axios.get(
        `http://localhost:5000/api/weather/current/${city}`
      );
      setWeather(weatherRes.data);

      const forecastRes = await axios.get(
        `http://localhost:5000/api/weather/forecast/${city}`
      );
      setForecast(forecastRes.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const convertTemp = (tempC) => {
    if (unit === 'F') {
      return ((tempC * 9) / 5 + 32).toFixed(1);
    }
    return tempC.toFixed(1);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>⛅ Weather App</h1>
        <p>Real-time weather data worldwide</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="unit-toggle">
        <button
          className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
          onClick={() => setUnit('C')}
        >
          °C
        </button>
        <button
          className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
          onClick={() => setUnit('F')}
        >
          °F
        </button>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {error && <p className="error">⚠️ {error}</p>}

      {weather && (
        <WeatherCard
          weather={weather}
          unit={unit}
          convertTemp={convertTemp}
        />
      )}

      {forecast && (
        <Forecast
          forecast={forecast}
          unit={unit}
          convertTemp={convertTemp}
        />
      )}
    </div>
  );
}

export default App;