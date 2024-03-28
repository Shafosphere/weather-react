import React, { useState } from 'react';
import CurrentWeather from './card-current-weather';
import WeatherCard from './cards';
import ChartPerHour from './chart-hours';
import ChartPerMinute from './chart-minutely';
import "./styles.css";
import "./background.css"
import data from './data';
export default function Main() {
  const [city, setCity] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    console.log(city);
    // Tutaj możesz wykonać inne operacje, np. wysłać dane do API
  }

  function TypeACityName(e) {
    setCity(e.target.value);
  }
  return (
    <div className="container open-sans">
      <div className="window">
        <div className='top'>
          <form onSubmit={handleSubmit}>
            <input type='text' onChange={TypeACityName} placeholder='Type a city name:'></input>
            <input type="submit" value="Send" />
          </form>
        </div>
        <div className='bot'>
          <div className='container-bottom'>
            <div className='wave'></div>
            <div className='wave'></div>
            <h5>{data[0].location.name}</h5>
            <CurrentWeather></CurrentWeather>
            <WeatherCard></WeatherCard>
            <ChartPerMinute></ChartPerMinute>
            <ChartPerHour></ChartPerHour>
          </div>
        </div>
      </div>
    </div>
  );
}
