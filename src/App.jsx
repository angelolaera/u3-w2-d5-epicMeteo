import React, { useState, useEffect } from "react";
import CitySelector from "./components/CitySelector.jsx";
import WeatherInfo from "./components/WeatherInfo.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "7add78bb1f9eb77585ffc5f94f692947";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoordinates = (city) => {
    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`).then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta al server per le coordinate");
      }
      return response.json();
    });
  };

  const fetchWeatherData = (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta al server per i dati meteo");
      }
      return response.json();
    });
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
    setLoading(true);
    setError(null);
    setWeatherData(null);

    fetchCoordinates(newCity)
      .then((coordinates) => {
        if (coordinates.length === 0) {
          throw new Error("Città non trovata");
        }
        const { lat, lon } = coordinates[0];
        return fetchWeatherData(lat, lon);
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-secondary">EPIC METEO</h1>
        <CitySelector onCityChange={handleCityChange} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && <WeatherInfo data={weatherData} />}
      </header>
    </div>
  );
};

export default App;
