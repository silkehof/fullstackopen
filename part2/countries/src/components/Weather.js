import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState(undefined)

    const api_key = process.env.REACT_APP_API_KEY
    const capital = props.capital

    const hook = () => {
        console.log('weather effect')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                console.log('weather promise fulfilled')
                setWeatherData(response.data)
            })
    }

    useEffect(hook, [capital, api_key])

    const getWeatherData = () => {
        if (weatherData) {
            return (
            <div>
                <p>Temperature: {weatherData.current.temperature} Degrees Celcius</p>
                <p><strong>{weatherData.current.weather_descriptions[0]}</strong></p>
                <img src={weatherData.current.weather_icons[0]} alt='Weather Icon'></img>
                <p>Wind: {weatherData.current.wind_speed} mph, direction is {weatherData.current.wind_dir}</p>
                <p>Weather conditions have been observed at {weatherData.current.observation_time}.</p>
            </div>
            )
        } else {
            return <p>Weather data not available right now.</p>
        }
    }

    return (
    <div>
        <h3>Weather in {capital}</h3>
        {getWeatherData()}
    </div>
    )
}

export default Weather