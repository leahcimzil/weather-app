import React, { useState } from "react";

const api = {
  key: "f8497a996e05e4c9d9fc7c45105b2164",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then(result => {
        console.log(result)
        setWeather(result);
        setQuery('')
      });
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }


  return (
    // (weather.weather[0].main === 'Rain')? "app rain" : (weather.weather[0].main === 'Clear') ? 'app warm' : 'app cold'
    <div className={(typeof weather.main !== 'undefined' && weather.main.temp > 16) ?  "app warm" : "app cold"}>
      <main>

        <div className = "search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search City..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>

        {(typeof weather.main != 'undefined') ? (
          <div>

            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather"> {weather.weather[0].description}</div>
            </div>

            <div className="weather-conditions">
              <div className="humidity border-right">{weather.main.humidity}% <span>Humidity</span></div>
              <div className="visibility border-right">{(weather.visibility)/1000} km <span>Visibility</span></div>
              <div className="wind-speed">{(weather.wind.speed)} km/hr <span>Wind Speed</span></div>
            </div>

          </div>
        ) : ('')}

        

      </main>
    </div>
  );
}

export default App;
