import React, { useState } from 'react';
import CurrentWeather from '../cards/card-current-weather';
import WeatherCard from '../cards/cards.jsx';
import ChartPerHour from '../charts/chart-hours.jsx';
import ChartPerMinute from '../charts/chart-minutely';
import FooterContact from './footer.jsx';
import { SlMagnifier } from 'react-icons/sl';
import './styles.css';
import './background.css';
import data from './data';

export default function Main() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(data);
  const API_KEY = process.env.REACT_APP_API_KEY;

  async function fetchWeatherData() {
    try {
      const data = [];
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${API_KEY}`
      );
      data.push(await response.json());
      setWeatherData(data);
    } catch (error) {
      console.error('Błąd pobierania danych pogodowych:', error);
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  }

  function TypeACityName(e) {
    setCity(e.target.value);
    console.log(API_KEY);
  }

  function handleIconPress() {
    fetchWeatherData();
  }

  return (
    <div className="container open-sans">
      <div className="window">
        <div className="top">
          <div className="custom_input">
            <SlMagnifier className="svg_icon" onClick={handleIconPress} />
            <input
              className="input"
              onChange={TypeACityName}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="find a city"
            />
          </div>
          <a
            href="https://docs.tomorrow.io/reference/welcome"
            target="_blank"
            rel="noopener noreferrer"
          >
            data from api.tomorrow.io
          </a>
        </div>
        <div className="bot">
          <div className="container-bottom">
            <h3>{weatherData[0].location.name}</h3>
            <CurrentWeather data={weatherData} />
            <WeatherCard data={weatherData} />
            <ChartPerMinute data={weatherData} />
            <ChartPerHour data={weatherData} />
          </div>
        </div>
        <FooterContact />
      </div>
      <div className="wave"></div>
    </div>
  );
}
