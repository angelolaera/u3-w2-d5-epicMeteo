import React, { useState } from "react";

// Componente per selezionare una città
const CitySelector = ({ onCityChange }) => {
  const [inputCity, setInputCity] = useState(""); // Stato per l'input della città
  const [open, setOpen] = useState(false);

  // Gestisce il cambiamento del valore dell'input
  const handleChange = (e) => {
    setInputCity(e.target.value); // Aggiorna lo stato con il valore dell'input
  };

  // Gestisce l'invio del modulo
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del modulo
    if (inputCity.trim()) {
      onCityChange(inputCity.trim()); // Chiama la funzione per cambiare la città se l'input non è vuoto
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <div className="form-group mb-2">
        <input
          type="text"
          className="form-control search bg-secondary border-0 rounded-3 text-center text-white"
          value={inputCity}
          onChange={handleChange}
          placeholder="Inserisci una città"
        />
      </div>
      <button type="submit" className="btn btn-secondary mb-2">
        Cerca
      </button>
    </form>
  );
};

export default CitySelector;
