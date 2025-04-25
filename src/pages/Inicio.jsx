// src/pages/Inicio.jsx
import React from 'react';

export default function Inicio() {
  return (
    <div className="text-center">
      <h1 className="display-4">Bienvenido al Sistema de Inventario</h1>
      <h2  className="display-5" >Aly's Eventos</h2>
      <br /><br />
      <p className="lead">Gestiona tus ítems y categorías de forma rápida y sencilla.</p>
      <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" alt="Inventario" style={{ maxWidth: '200px' }} />
    </div>
  );
}

