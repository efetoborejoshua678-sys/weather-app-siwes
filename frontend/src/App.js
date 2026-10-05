import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'https://weather-app-siwes-production.up.railway.app';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCity, setCurrentCity] = useState('Central Jakarta');
  const [currentTemp, setCurrentTemp] = useState('10');
  const [currentUnit] = useState('C');
  const [currentCountry, setCurrentCountry] = useState('Indonesia');
  const [currentCondition, setCurrentCondition] = useState('Strom with Heavy Rain');
  const [currentWind, setCurrentWind] = useState('19 mph');
  const [currentHumidity, setCurrentHumidity] = useState('40%');
  const [currentGust, setCurrentGust] = useState('15km/h');
  const [blurbText, setBlurbText] = useState(
    'Partly cloudy with occasional snow showers. High around 50°F. Wind from the east 11 to 21 mph. Snow chance is 40%, with rainfall expected to be less than an inch.'
  );

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const safeCity = encodeURIComponent(searchQuery.trim());
      const res = await axios.get(`${API_BASE_URL}/api/weather/current/${safeCity}`);
      if (res.data) {
        const data = res.data;
        setCurrentCity(data.name || searchQuery);
        setCurrentCountry(data.sys?.country || 'Global');
        setCurrentTemp(Math.round(data.main?.temp || 10).toString());
        setCurrentCondition(data.weather?.[0]?.main || 'Clear');
        setCurrentWind(`${Math.round(data.wind?.speed || 5)} mph`);
        setCurrentHumidity(`${data.main?.humidity || 40}%`);
        setCurrentGust(`${Math.round((data.wind?.gust || data.wind?.speed || 4) * 3.6)}km/h`);
        setBlurbText(
          `${data.weather?.[0]?.description || 'Weather condition'}. Temp is ${Math.round(
            data.main?.temp
          )}°C, feels like ${Math.round(data.main?.feels_like)}°C. Humidity is ${
            data.main?.humidity
          }%.`
        );
      }
    } catch (err) {
      console.log('Search error:', err);
    }
  };

  return (
    <div className="stage">
      {/* SVG Icon Sprite */}
      <svg style={{ display: 'none' }}>
        <symbol id="logo-icon" viewBox="0 0 40 40">
          <rect width="40" height="40" rx="12" fill="rgba(255,255,255,0.18)" />
          <path
            d="M8 15 Q14 10, 20 15 T32 15 M8 20 Q14 15, 20 20 T32 20 M8 25 Q14 20, 20 25 T32 25"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-grid" viewBox="0 0 24 24">
          <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
          <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
          <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
          <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
        </symbol>
        <symbol id="i-chart" viewBox="0 0 24 24">
          <path d="M4 19h16v2H2V3h2v16zM7 13l4-4 4 4 6-6v3h-2v-3.59l-4 4-4-4-4 4H7v-1.41z" fill="currentColor" />
        </symbol>
        <symbol id="i-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" fill="none" stroke="currentColor" strokeWidth="2" />
        </symbol>
        <symbol id="i-cal" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="i-gear" viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor" />
        </symbol>
        <symbol id="i-out" viewBox="0 0 24 24">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
        </symbol>
        <symbol id="i-bell" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
        </symbol>
        <symbol id="i-wind" viewBox="0 0 24 24">
          <path d="M14.5 17a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 14.5 12H2v2h12.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5H12v2h2.5zM19.5 7a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 19.5 2H2v2h17.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5H17v2h2.5zM10.5 10a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 10.5 5H2v2h8.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5H8v2h2.5z" fill="currentColor" />
        </symbol>
        <symbol id="i-drop" viewBox="0 0 24 24">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="currentColor" />
        </symbol>
        <symbol id="i-gust" viewBox="0 0 24 24">
          <path d="M12 4C7.03 4 3 8.03 3 13c0 2.12.74 4.07 1.97 5.61L4.35 19.2a1 1 0 0 0 1.41 1.41l.62-.62A9.957 9.957 0 0 0 12 23c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9zm0 17c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v5h-2zm0 7h2v2h-2z" fill="currentColor" />
        </symbol>
        <symbol id="i-cloud" viewBox="0 0 24 24">
          <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="currentColor" />
        </symbol>
        <symbol id="i-cloud2" viewBox="0 0 24 24">
          <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="currentColor" opacity="0.8" />
          <circle cx="19" cy="6" r="3" fill="currentColor" />
        </symbol>
        <symbol id="i-hail" viewBox="0 0 24 24">
          <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="currentColor" />
          <circle cx="7" cy="22" r="1.5" fill="currentColor" />
          <circle cx="12" cy="22" r="1.5" fill="currentColor" />
          <circle cx="17" cy="22" r="1.5" fill="currentColor" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="i-avatar" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path d="M12 14c-6.1 0-8 4-8 4v2h16v-2s-1.9-4-8-4z" fill="currentColor" />
        </symbol>
      </svg>

      {/* 1) LEFT SIDEBAR */}
      <aside className="sidebar" aria-label="Main Navigation">
        <div className="pip"></div>
        <div className="logo" title="9CELL Weather App">
          <svg><use href="#logo-icon" /></svg>
        </div>
        <nav className="nav">
          <a href="#dashboard" aria-label="Dashboard" aria-current="page" title="Dashboard">
            <svg><use href="#i-grid" /></svg>
          </a>
          <a href="#reports" aria-label="Reports" title="Reports">
            <svg><use href="#i-chart" /></svg>
          </a>
          <a href="#explore" aria-label="Explore regions" title="Explore regions">
            <svg><use href="#i-globe" /></svg>
          </a>
          <a href="#calendar" aria-label="Calendar" title="Calendar">
            <svg><use href="#i-cal" /></svg>
          </a>
          <a href="#settings" aria-label="Settings" title="Settings">
            <svg><use href="#i-gear" /></svg>
          </a>
        </nav>
        <button className="logout" aria-label="Sign out" title="Sign out">
          <svg><use href="#i-out" /></svg>
        </button>
      </aside>

      {/* 2) HEADER */}
      <header className="header">
        <div className="greeting">
          <span className="welcome">Welcome</span>
          <span className="user-name">Calfin Danang</span>
        </div>
        <div className="tools">
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="tool-btn" style={{ width: '32px', height: '32px', background: 'transparent', border: 'none' }} title="Search">
              <svg><use href="#i-search" /></svg>
            </button>
          </form>
          <button className="tool-btn" aria-label="Add location" title="Add location">
            <svg><use href="#i-plus" /></svg>
          </button>
          <button className="tool-btn" aria-label="Notifications" title="Notifications">
            <svg><use href="#i-bell" /></svg>
          </button>
          <a href="#profile" className="tool-btn tool-avatar" aria-label="Profile" title="Profile">
            <svg><use href="#i-avatar" /></svg>
          </a>
        </div>
      </header>

      {/* 3) HERO */}
      <main className="hero">
        <div className="chip">Weather Forecast</div>
        <h1>
          <span className="ln"><span>{currentCondition}</span></span>
        </h1>
        <p className="blurb">{blurbText}</p>
      </main>

      {/* 4) FORECAST STRIP */}
      <section className="forecast" aria-label="Forecast Strip">
        <div className="forecast-temps">
          <div className="forecast-temp-item">
            <span>11°</span>
            <svg><use href="#i-cloud" /></svg>
          </div>
          <div className="forecast-temp-item">
            <span>13°</span>
            <svg><use href="#i-cloud2" /></svg>
          </div>
          <div className="forecast-temp-item">
            <span>14°</span>
            <svg><use href="#i-cloud2" /></svg>
          </div>
          <div className="forecast-temp-item">
            <span>10°</span>
            <svg><use href="#i-hail" /></svg>
          </div>
          <div className="forecast-temp-item">
            <span>19°</span>
            <svg><use href="#i-sun" /></svg>
          </div>
          <div className="forecast-temp-item">
            <span>12°</span>
            <svg><use href="#i-cloud" /></svg>
          </div>
        </div>

        {/* Animated SVG Wave Chart */}
        <div className="chart-container">
          <svg
            className="chart-svg"
            viewBox="0 0 835 230"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
              </linearGradient>

              <linearGradient id="wf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <mask id="wfade">
                <rect x="0" y="0" width="835" height="230" fill="url(#wf)" />
              </mask>

              <clipPath id="wclip">
                <rect id="wclipr" className="wclip-rect" x="0" y="0" width="835" height="230" />
              </clipPath>
            </defs>

            {/* Closed Fill Path */}
            <path
              d="M 0,135 C 80,135 90,105 167,105 C 240,105 260,90 334,90 C 410,90 430,150 501,150 C 570,150 590,30 668,30 C 745,30 760,120 835,120 L 835,230 L 0,230 Z"
              fill="#ffffff"
              mask="url(#wfade)"
              clipPath="url(#wclip)"
            />

            {/* Outline 1 (outer ambient glow) */}
            <path
              className="wline"
              pathLength="1"
              d="M 0,135 C 80,135 90,105 167,105 C 240,105 260,90 334,90 C 410,90 430,150 501,150 C 570,150 590,30 668,30 C 745,30 760,120 835,120"
              fill="none"
              stroke="url(#wg)"
              strokeWidth="6.2"
              strokeOpacity="0.17"
            />

            {/* Outline 2 (mid soft stroke) */}
            <path
              className="wline"
              pathLength="1"
              d="M 0,135 C 80,135 90,105 167,105 C 240,105 260,90 334,90 C 410,90 430,150 501,150 C 570,150 590,30 668,30 C 745,30 760,120 835,120"
              fill="none"
              stroke="url(#wg)"
              strokeWidth="4.6"
              strokeOpacity="0.26"
            />

            {/* Outline 3 (sharp main line) */}
            <path
              className="wline"
              pathLength="1"
              d="M 0,135 C 80,135 90,105 167,105 C 240,105 260,90 334,90 C 410,90 430,150 501,150 C 570,150 590,30 668,30 C 745,30 760,120 835,120"
              fill="none"
              stroke="url(#wg)"
              strokeWidth="3.4"
              strokeOpacity="1"
            />
          </svg>
        </div>

        <div className="forecast-days">
          <span className="day-item">Sunday</span>
          <span className="day-item">Monday</span>
          <span className="day-item">Tuesday</span>
          <span className="day-item on">Wednesday</span>
          <span className="day-item">Thursday</span>
          <span className="day-item">Friday</span>
        </div>
      </section>

      {/* 5) RIGHT RAIL CARDS */}
      <aside className="rail" aria-label="Regional Weather Cards">
        {/* Card A (Big Main Card) */}
        <div className="card big">
          <div className="card-location">
            <svg><use href="#i-pin" /></svg>
            <span>{currentCity}{currentCountry ? `, ${currentCountry}` : ''}</span>
          </div>

          <div className="big-temp">
            {currentTemp}° <i>{currentUnit}</i>
          </div>

          <div className="card-metrics">
            <div className="metric-item">
              <svg><use href="#i-wind" /></svg>
              <span>{currentWind}</span>
            </div>
            <div className="metric-item">
              <svg><use href="#i-drop" /></svg>
              <span>{currentHumidity}</span>
            </div>
            <div className="metric-item">
              <svg><use href="#i-gust" /></svg>
              <span>{currentGust}</span>
            </div>
          </div>
        </div>

        {/* Card B */}
        <div className="card row">
          <div className="row-info">
            <span className="row-country">Indonesia</span>
            <span className="row-city">North Jakarta</span>
            <span className="row-condition">Mostly Sunny</span>
          </div>
          <div className="row-temp-box">
            <span className="row-temp">12°</span>
            <svg><use href="#i-cloud" /></svg>
          </div>
        </div>

        {/* Card C */}
        <div className="card row">
          <div className="row-info">
            <span className="row-country">Indonesia</span>
            <span className="row-city">Bandung</span>
            <span className="row-condition">Cloudy</span>
          </div>
          <div className="row-temp-box">
            <span className="row-temp">10°</span>
            <svg><use href="#i-cloud" /></svg>
          </div>
        </div>

        {/* Card D */}
        <div className="card row">
          <div className="row-info">
            <span className="row-country">Indonesia</span>
            <span className="row-city">South Jakarta</span>
            <span className="row-condition">Sunny</span>
          </div>
          <div className="row-temp-box">
            <span className="row-temp">14°</span>
            <svg><use href="#i-cloud2" /></svg>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;