import React from "react";
import { Button, Card } from "react-bootstrap";

// Componente per mostrare le informazioni meteo
const WeatherInfo = ({ data }) => {
  if (!data) return null; // Restituisce null se non ci sono dati meteo

  const { main, weather, wind } = data; // Estrae le informazioni principali dai dati meteo

  return (
    <Card className="bg-secondary">
      <Card.Body>
        <Card.Title className="text-white">{data.name}</Card.Title>
        <Card.Text className="text-white">Temperatura: {main.temp} °C 🌡️​</Card.Text>
        <Card.Text className="text-white">Condizione: {weather[0].description} ☁️​</Card.Text>
        <Card.Text className="text-white">Umidità: {main.humidity}% 💧​</Card.Text>
        <Card.Text className="text-white">Vento: {wind.speed} km/h 🍃​</Card.Text>
        <Button variant="light">Dettagli</Button>
      </Card.Body>
    </Card>
  );
};

export default WeatherInfo;
