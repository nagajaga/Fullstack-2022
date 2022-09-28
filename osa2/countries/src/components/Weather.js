import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setWeather(null);
    console.log("effect");
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        console.log("promise fulfilled");
        setWeather(response.data);
      });
  }, [country]);

  if (weather)
    return (
      <div>
        <h1>Weather in {country.capital[0]}</h1>
        <p>Temperature: {weather.main.temp} °C</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>Wind speed: {weather.wind.speed} m/s</p>
      </div>
    );
};

export default Weather;
