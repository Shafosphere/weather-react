import { useState } from 'react';
import { WiDaySunny, WiCloudy, WiDayCloudy, WiRain, WiDayRain, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import data from './data';
import "./styles.css";
export default function WeatherCard() {
    const [icon, setIcon] = useState();
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
            {/* <h5>{(data[0].timelines.daily).length}</h5> */}
            {(data[0].timelines.daily).map((item) => (
                <div className='grid-item'>
                    <div className='grid-item-top'>
                        <div className='icon-container'>
                            {getWeatherIcon(item.values.cloudCoverAvg, item.values.precipitationProbabilityAvg)}
                        </div>
                        <div>
                            <p>{item.values.temperatureApparentAvg}°C</p>
                        </div>
                    </div>
                    <div class="grid-item-bottom">
                        <div class="Date">
                            <h3>
                            {
                                new Date(item.time).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long'
                                })
                            }
                            </h3>
                        </div>
                        <div class="Temperature-Avg">
                        {item.values.temperatureApparentAvg}°C
                        </div>
                        <div class="Temperature-Max">max {item.values.temperatureApparentMax}°C</div>
                        <div class="Temperature-Min">min {item.values.temperatureApparentMin}°C</div>
                        <div class="Precipitation-Probability">PoP: {item.values.precipitationProbabilityAvg}%</div>
                        <div class="Rain-Intensity">RI{item.values.rainIntensityAvg} mm/h</div>
                        <div class="Wind-Speed-Avg"> Avg {item.values.windSpeedAvg} km/h</div>
                        <div class="Wind-Gust-Max">Max {item.values.windGustMax} km/h</div>
                        <div class="Wind-Icon"><WiStrongWind /></div>
                        <div class="Cloud-Cover">Clouds: {item.values.cloudCoverAvg}%</div>
                        <div class="Humidity">Humidity: {item.values.humidityAvg}%</div>
                        <div class="Sunrise-Time"><WiSunrise className='Sunrise-Icon'/> {new Date(item.values.sunriseTime).toLocaleTimeString()}</div>
                        <div class="Sunset-Time"><WiSunset className='Sunset-Icon'/> {new Date(item.values.sunsetTime).toLocaleTimeString()}</div>
                    </div>
                </div>
            ))}
        </div>
    )
};