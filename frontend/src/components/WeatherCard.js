import React from 'react';

function WeatherCard({ weather, unit, convertTemp }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <p className="city-name">{weather.name}</p>
      <p className="country">{weather.sys.country} 🌍</p>

      <div className="weather-main">
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].main}
        />
        <div className="temp-section">
          <span className="temperature">
            {convertTemp(weather.main.temp)}°{unit}
          </span>
          <span className="description">
            {weather.weather[0].description}
          </span>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-label">Feels Like</div>
          <div className="detail-value">
            {convertTemp(weather.main.feels_like)}°{unit}
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Humidity</div>
          <div className="detail-value">{weather.main.humidity}%</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Wind Speed</div>
          <div className="detail-value">{weather.wind.speed} m/s</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Pressure</div>
          <div className="detail-value">{weather.main.pressure} hPa</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Min Temp</div>
          <div className="detail-value">
            {convertTemp(weather.main.temp_min)}°{unit}
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Max Temp</div>
          <div className="detail-value">
            {convertTemp(weather.main.temp_max)}°{unit}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;