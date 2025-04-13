// src/pages/Movimientos.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Movimientos() {
  const [movimientos, setMovimientos] = useState([]);

  const fetchMovimientos = async () => {
    const res = await api.get('/movimientos');
    setMovimientos(res.data);
  };

  useEffect(() => {
    fetchMovimientos();
  }, []);

  return (
    <div className="container">
      <h3>Movimientos de Inventario</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Item</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map(mov => (
            <tr key={mov.id}>
              <td>{mov.item_nombre}</td>
              <td>{mov.tipo_movimiento}</td>
              <td>{mov.cantidad}</td>
              <td>{new Date(mov.fecha_movimiento).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
