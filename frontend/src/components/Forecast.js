import React from 'react';

function Forecast({ forecast, unit, convertTemp }) {
  if (!forecast) return null;

  const dailyForecasts = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecasts.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-card">
            <p className="date">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC'
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].main}
              width="50"
            />
            <p className="temp">
              {convertTemp(day.main.temp)}°{unit}
            </p>
            <p className="desc">{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;