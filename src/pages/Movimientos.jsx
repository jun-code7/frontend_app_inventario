
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/tables.css'

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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Movimientos de Inventario</h4>
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Observaciones</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No hay movimientos disponibles</td>
              </tr>
            ) : (
              movimientos.map((mov, index) => (
                <tr key={mov.id}>
                  <td>{index + 1}</td>
                  <td className=' text-black fw-bolder '>{mov.item_nombre}</td>
                  <td>{mov.tipo_movimiento}</td>
                  <td>{mov.cantidad}</td>
                  <td>{mov.observaciones}</td>
                  <td>{new Date(mov.fecha_movimiento).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}