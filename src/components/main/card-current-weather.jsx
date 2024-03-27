import "./styles-current-weather.css";
import moment from 'moment';
import { 
    WiDaySunny, 
    WiCloudy, 
    WiDayCloudy, 
    WiRain, 
    WiBarometer, 
    WiDayRain, 
    WiStrongWind, 
    WiUmbrella, 
    WiCloud, 
    WiHumidity 
} from "react-icons/wi";
import data from "./data";

// Component for displaying the current date
function CurrentDate({ currentDate }) {
    return (
        <div className="head-current">
            <h3>{currentDate}</h3>
        </div>
    );
}

// Component for displaying weather icon
function WeatherIcon({ cloudCover, precipitationProbability }) {
    if (cloudCover >= 75) {
        return precipitationProbability >= 35 ? <WiRain /> : <WiCloudy />;
    } else if (cloudCover <= 75 && cloudCover >= 25) {
        return precipitationProbability >= 35 ? <WiDayRain /> : <WiDayCloudy />;
    } else {
        return <WiDaySunny />;
    }
}

// Component for displaying weather details
function WeatherDetails({ data }) {
    return (
        <div className="body-right-current">
            <div className="-current-temperature-value">{data.temperature} °C</div>
            <div className="current-text">Current Temperature: </div>
            <div className="precipitationProbability-text">Precipitation Probability:</div>
            <div className="temperatureApparent-text">Apparent Temperature:</div>
            <div className="temperatureApparent-value">{data.temperatureApparent} °C</div>
            <div className="precipitationProbability-value">
                <div className="precipitationProbability-value-text">{data.precipitationProbability} %</div>
                <div className="precipitationProbability-value-icon"><WiUmbrella /></div>
            </div>
            <div className="windSpeed-text">Wind Speed:</div>
            <div className="windSpeed-value">
                <div className="windSpeed-value-text">{data.windSpeed} km/h</div>
                <div className="windSpeed-value-icon"><WiStrongWind /></div>
            </div>
        </div>
    );
}

// Component for displaying footer details
function FooterDetails({ data }) {
    return (
        <div className="footer-current">
            <div className="cloudCover">
                <div className="cloudCover-icon"><WiCloud /></div>
                <div className="cloudCover-value">Clouds: {data.cloudCover} %</div>
            </div>
            <div className="humidity">
                <div className="humidity-icon"><WiHumidity /></div>
                <div className="humidity-value">Humidity: {data.humidity} %</div>
            </div>
            <div className="pressureSurfaceLevel">
                <div className="pressureSurfaceLevel-icon"><WiBarometer /></div>
                <div className="pressureSurfaceLevel-value">Pressure: {data.pressureSurfaceLevel} </div>
            </div>
        </div>
    );
}

export default function CurrentWeather() {
    const currentMinutelyData = data[0].timelines.minutely[0].values;
    const currentDateValue = moment(currentMinutelyData.time).format('dddd, DD/MM/YYYY');

    return (
        <div className="container-current">
            <div className="window-current">
                <CurrentDate currentDate={currentDateValue} />
                <div className="body-current">
                    <div className="body-left-current">
                        <WeatherIcon
                            cloudCover={currentMinutelyData.cloudCover}
                            precipitationProbability={currentMinutelyData.precipitationProbability}
                        />
                    </div>
                    <WeatherDetails data={currentMinutelyData} />
                </div>
                <FooterDetails data={currentMinutelyData} />
            </div>
        </div>
    );
}
