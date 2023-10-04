// AnunciarGanador.js
import React, { useState } from 'react';
import { Button, Alert } from 'bootstrap'; // Asegúrate de tener bootstrap instalado o usa otro componente de botón
import './AnunciarGanador.css'

const AnunciarGanador = ({ contract, account }) => {
  const [ganador, setGanador] = useState("");

  const anunciarGanador = async () => {
    try {
      // Llamada al contrato para obtener el nombre del ganador
      const nombreGanador = await contract.methods.obtenerGanador().call();
      // Mostrar el nombre del ganador en una alerta
      alert(`El ganador de las elecciones es: ${nombreGanador}`);
      // Establecer el estado del ganador para mostrarlo en la UI
      setGanador(nombreGanador);
    } catch (error) {
      console.error("Error al anunciar al ganador:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
    <button onClick={anunciarGanador} className="btn-anunciar">
    Anunciar Ganador
  </button>
  <br/>
  <br/>
      {ganador && (
        <div className="alerta-ganador">
          El ganador de las elecciones es: <strong>{ganador}</strong>
        </div>
      )}
    </div>
  );
};

export default AnunciarGanador;
