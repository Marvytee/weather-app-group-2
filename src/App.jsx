import './App.css'

import { useState, useEffect } from 'react'
const icons = {
  Sunny:
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/clear-day.svg',
  'Partly cloudy':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/partly-cloudy-day.svg',
  Cloudy:
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/cloudy.svg',
  Overcast:
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/overcast.svg',
  'Light drizzle':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/drizzle.svg',
  'Heavy rain':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg',
  'Moderate or heavy rain with thunder':
    'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/thunderstorms-extreme-rain.svg',
}

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const currentDate = new Date()
  const month = currentDate.getMonth() + 1
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const currentMonth = monthNames[month - 1]
  const day = currentDate.getDay()
  const dayOfWeek = daysOfWeek[day]
  const date = `${dayOfWeek}, ${currentDate.getDate()} ${currentMonth}`

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const long = position.coords.longitude
        const lat = position.coords.latitude

        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=b95a0269dd2e41c4ba9155455220906&q=${lat},${long}&aqi=yes`

        async function getData(url) {
          const data = await fetch(url)
          return await data.json()
        }

        getData(apiUrl).then((data) => {
          console.log(data)

          let { name, region, country } = data.location
          let { text, icon } = data.current.condition

          let {
            is_day,
            temp_c,
            temp_f,
            last_updated,
            wind_kph,
            wind_dir,
            uv,
            vis_km,
            pressure_mb,
            humidity,
            precip_mm,
            feelslike_c,
            feelslike_f,
          } = data.current

          if (icons.hasOwnProperty(text)) {
            icon = icons[text]
          } else {
            icon = data.current.condition.icon
          }

          setWeatherData({
            name,
            region,
            country,
            text,
            icon,
            is_day,
            temp_c,
            temp_f,
            last_updated,
            wind_kph,
            wind_dir,
            uv,
            vis_km,
            pressure_mb,
            humidity,
            precip_mm,
            feelslike_c,
            feelslike_f,
          })
        })
      })
    }
  }, [])

  return (
    <div>
      {weatherData && (
        <>
          <div className="wrapper">
            <div className="weather-container">
              <section className="temperature">
                <div className="temperature-description">
                  {weatherData.text}
                </div>
                <h2 className="temperature-degree">
                  {weatherData.temp_c}&deg;C/{weatherData.temp_f}&deg;F
                </h2>
                {/* <h3 className="feels-like">
                  {" "}
                  Feels like {weatherData.feelslike_c}&deg;C/
                  {weatherData.feelslike_f}&deg;F
                </h3> */}
              </section>
              <section className="location">
                <img src={weatherData.icon} className="icon" />
                <div>
                  <h1 className="location">{weatherData.name}</h1>
                  <div className="date">
                    <small>{date}</small>
                  </div>
                </div>
              </section>
            </div>
            <div className="right">
              <section className="weather">
                <section className="weather-detail">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/wind.svg"
                      className="conIcons"
                    />
                  </div>
                  <div>
                    Wind:
                    <span className="labels">
                      {weatherData.wind_kph}km/h {weatherData.wind_dir}
                    </span>
                  </div>
                </section>
                <section className="weather-detail">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/humidity.svg"
                      className="conIcons"
                    />
                  </div>
                  <div>
                    Humidity:
                    <span className="labels">{weatherData.humidity}</span>
                  </div>
                </section>
                <section className="weather-detail">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/rain.svg"
                      className="conIcons"
                    />
                  </div>
                  <div>
                    Rainfall:{" "}
                    <span className="labels">{weatherData.precip_mm} mm</span>
                  </div>
                </section>
                <section className="weather-detail">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/uv-index.svg"
                      className="conIcons"
                    />
                  </div>
                  <div>
                    UV index: <span className="labels">{weatherData.uv}</span>
                  </div>
                </section>
                <section className="weather-detail">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/design/fill/final/pressure-high.svg"
                      className="conIcons"
                    />
                  </div>
                  <div>
                    Pressure:{" "}
                    <span className="labels">{weatherData.pressure_mb} mb</span>
                  </div>
                </section>
              </section>
            </div>
          </div>
          <div className="bottom">
            <p className="updated-text">
              last updated {weatherData.last_updated}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default App
