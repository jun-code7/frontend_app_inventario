
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/tables.css'
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';


export default function Movimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    item_id: '',
    tipo_movimiento: 'Ingreso',
    cantidad: '',
    observaciones: ''
  });



  const fetchMovimientos = async () => {
    const res = await api.get('/movimientos');
    setMovimientos(res.data);
  };


  const fetchItems = async () => {
    const res = await api.get('/items');
    setItems(res.data);
  };
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/movimientos', form);
      toast.success("!Movimiento creado con Éxito");
      fetchMovimientos();
      setShowModal(false);
      setForm({ item_id: '', tipo_movimiento: 'Ingreso', cantidad: '', observaciones: '' });
    } catch (error) {
      console.error('Error al crear movimiento', error);
    }
  };
  
  useEffect(() => {
    fetchMovimientos();
    fetchItems();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Movimientos de Inventario</h4>
        <Button variant="success" onClick={() => setShowModal(true)}>
          Nuevo Movimiento
        </Button>
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
      {showModal && (
      <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Registrar Movimiento</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Ítem</label>
                  <select name="item_id" className="form-select" value={form.item_id} onChange={handleChange} required>
                    <option value="">Selecciona un ítem</option>
                    {items.map(item => (
                      <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo de Movimiento</label>
                  <select name="tipo_movimiento" className="form-select" value={form.tipo_movimiento} onChange={handleChange}>
                    <option value="Ingreso">Ingreso</option>
                    <option value="Salida">Salida</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Cantidad</label>
                  <input type="number" name="cantidad" className="form-control" value={form.cantidad} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Observaciones</label>
                  <textarea name="observaciones" className="form-control" value={form.observaciones} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    </div> 
  );
}