import React, { useState } from 'react';
import { Loading } from '../src/Loading'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const api = {
  key: "18473f42aae6e9202a79ec75db7abfab",
  base: "https://api.openweathermap.org/data/2.5/"
}
const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const search = (evt) => {

    if (evt.key === "Enter") {
      setLoading(true)
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)

        .then(res => res.json())

        .then(result => {
          setWeather(result);
          setQuery('');
          setLoading(false)
          console.log(result);
        });
    }

  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>

              <div className="location-box">

                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              {loading ? <div className="weather-box text-center mt-3">
                <h1><Loading /></h1>
              </div> : <div className="weather-box">
                <div className="location">{weather.name},{weather.sys.country}</div>
                <div className="temp">{Math.round(weather.main.temp)}° </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>}

            </div>
          ) : (
            <div>
              <div className="location-box">
                <div className="location"></div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box text-center">
                {loading ?
                  <div className="weather mt-3">{loading ? <h1><Loading /></h1> : ''}</div>
                  : <div className="weather">search your city...</div>}
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  )
}

export default App;