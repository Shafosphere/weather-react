import React from 'react';
import { WiDaySunny, WiCloudy, WiDayCloudy, WiRain, WiDayRain, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import "./styles-card.css"
export default function WeatherCard({ data }) {
    function getWeatherIcon(cloudCover, rainingPropabylyty) {
        if (cloudCover >= 75) {
            if (rainingPropabylyty >= 35) {
                return <WiRain />
            } else {
                return <WiCloudy />
            }
        }
        if (cloudCover <= 75 && cloudCover >= 25) {
            if (rainingPropabylyty >= 35) {
                return <WiDayRain />
            } else { return <WiDayCloudy /> }
        }
        return <WiDaySunny />;
    }
    return (
        <div className='grid-container'>
            {(data[0].timelines.daily).map((item, index) => (
                <div key={index} className='grid-item'>
                    <div className='grid-item-top'>
                        <div className='icon-container'>
                            {getWeatherIcon(item.values.cloudCoverAvg, item.values.precipitationProbabilityAvg)}
                        </div>
                        <div>
                            <p>{item.values.temperatureApparentAvg}°C</p>
                        </div>
                    </div>
                    <div className="grid-item-bottom">
                        <div className="Date">
                            <h3>
                                {
                                    new Date(item.time).toLocaleDateString('en-GB', {
                                        day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long'
                                    })
                                }
                            </h3>
                        </div>
                        <div className="Temperature-Avg">
                            {item.values.temperatureApparentAvg}°C
                        </div>
                        <div className="Temperature-Max">max {item.values.temperatureApparentMax}°C</div>
                        <div className="Temperature-Min">min {item.values.temperatureApparentMin}°C</div>
                        <div className="Precipitation-Probability">PoP: {item.values.precipitationProbabilityAvg}%</div>
                        <div className="Rain-Intensity">RI{item.values.rainIntensityAvg} mm/h</div>
                        <div className="Wind-Speed-Avg"> Avg {item.values.windSpeedAvg} km/h</div>
                        <div className="Wind-Gust-Max">Max {item.values.windGustMax} km/h</div>
                        <div className="Wind-Icon"><WiStrongWind /></div>
                        <div className="Cloud-Cover">Clouds: {item.values.cloudCoverAvg}%</div>
                        <div className="Humidity">Humidity: {item.values.humidityAvg}%</div>
                        <div className="Sunrise-Time"><WiSunrise className='Sunrise-Icon' /> {new Date(item.values.sunriseTime).toLocaleTimeString()}</div>
                        <div className="Sunset-Time"><WiSunset className='Sunset-Icon' /> {new Date(item.values.sunsetTime).toLocaleTimeString()}</div>
                    </div>
                </div>
            ))}
        </div>
    )
};