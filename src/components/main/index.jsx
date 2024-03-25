import React, { useState } from 'react';
import WeatherCard from './card';
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
            <h5>{data[0].location.name}</h5>
              <WeatherCard></WeatherCard>
          </div>
        </div>
      </div>
    </div>
  );
}
