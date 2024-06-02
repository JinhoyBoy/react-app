"use client";
import { useState } from "react";
import styles from "../page.module.css";
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import Link from 'next/link';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("");

  const searchOpenweathermap = () => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const city = document.getElementById("city").value;
    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const fullUrl = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;
    //console.log(fullUrl);
    fetch(fullUrl, {cache : "no-store"})
      .then(response => response.json())
      .then(data => {
        if (data.cod != "404") {
          const formattedData = populateWeatherData(data);
          setWeatherData(formattedData);
          setLocationData(data.city); // Store location data separately
          setError("")
        } else {
          setWeatherData(null);
          setLocationData(null);
          setError("This is not a valid city. Please try again.");
        }
      })
      .catch(error => console.error("Error fetching data from Openweathermap:", error));
  };

  const populateWeatherData = (data) => {
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toISOString().split('T')[0];
    };

    const dailyData = data.list.reduce((acc, item) => {
      const date = formatDate(item.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    const dates = Object.keys(dailyData).slice(0, 5);

    const formattedWeatherData = dates.map((date) => {
      const dayData = dailyData[date];
      const temps = dayData.map(item => item.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const weatherAt17 = dayData.find(item => new Date(item.dt * 1000).getHours() === 17); //GMT 17:00
      return { date, minTemp, maxTemp, weatherAt17 };
    });
    
    console.log(formattedWeatherData)

    return formattedWeatherData.map((day) => {
      return (
        <div key={day.date}>
          <p>{day.date}</p>
          <div className={styles.weatherItem}>
            {day.weatherAt17 ? (
              <>
                <img src={`https://openweathermap.org/img/wn/${day.weatherAt17.weather[0].icon}@2x.png`} alt="weather icon" />
                <h3>{day.weatherAt17.weather[0].description}</h3>
              </>
            ) : (
              <>
                <img src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`} alt="weather icon" />
                <h3>{data.list[0].weather[0].description}*</h3>
                <small style={{ color: "#898989" }}>Weather description at {(data.list[0].dt_txt).substring(11,16)}</small>
              </>
            )}
            <p>{Math.round(day.minTemp)}° - {Math.round(day.maxTemp)}°</p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "20vh" }}></div>
      <div className={styles.weatherHead}>
        <h1>Weather!</h1>
        <br />
        <input id="city" placeholder="City" />
        <button onClick={searchOpenweathermap}>Send</button>
      </div>
      <div>
        <div className={styles.weatherUI}>
          {weatherData && locationData && (
            <>
              <div className={styles.weatherHead}>
                <h2>Weather Forecast for {locationData.name}</h2>
                <p>Longitude: {locationData.coord.lon} Latitude: {locationData.coord.lat}</p>
              </div>
              <div className={styles.weatherList}>
                {weatherData}
              </div>
            </>
          )}
          {weatherData === null &&(
            <>
              <div style={{textAlign: 'center', height: '30vh', color: 'white', padding: '10px'}}>
                <p id="validcheck">{error}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <Link href="/">
        <h3 style={{ textAlign: "center", paddingBottom: "30px", textDecoration: "underline", color: "#898989" }}>Back to home</h3>
      </Link>
      <Footer />
    </>
  );
}

