// src/components/ItemsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ItemModal from './ItemModal';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemEditar, setItemEditar] = useState(null);
  const [busqueda, setBusqueda] = useState('');


  const obtenerItems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/inventario/items');
      setItems(res.data);
     // console.log(res.data)
    } catch (error) {
      console.error('Error al obtener los ítems:', error);
    }
  };

  const itemsFiltrados = items.filter(item => {
    const termino = busqueda.toLowerCase();
  
    return (
      item.nombre.toLowerCase().includes(termino) ||
      item.descripcion.toLowerCase().includes(termino) ||
      item.estado.toLowerCase().includes(termino) ||
      (item.categoria?.nombre?.toLowerCase().includes(termino))
    );
  });
  
  
  const obtenerCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/inventario/categorias');
      setCategorias(res.data);
     // console.log(res.data)
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    obtenerItems();
    obtenerCategorias();
  }, []);

  const eliminarItem = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ítem?')) {
      try {
        await axios.delete(`http://localhost:3000/api/inventario/items/${id}`);
        obtenerItems();
      } catch (error) {
        console.error('Error al eliminar el ítem:', error);
      }
    }
  };

  const abrirModal = (item = null) => {
    setItemEditar(item);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setItemEditar(null);
    setMostrarModal(false);
  };

  const manejarEnvioFormulario = async (formData) => {
    try {
      if (itemEditar) {
        await axios.put(`http://localhost:3000/api/inventario/items/${itemEditar.id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/inventario/items', formData);
      }
      cerrarModal();
      obtenerItems();
    } catch (error) {
      console.error('Error al guardar el ítem:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Listado de Ítems</h4>
        <Button variant="success" onClick={() => abrirModal()}>Agregar Ítem</Button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar ítem por nombre o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {itemsFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay ítems que coincidan con la búsqueda</td>
              </tr>
            ) : (
              itemsFiltrados.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.categoria?.nombre || 'Sin categoría'}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.estado}</td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-primary" onClick={() => itemEditar(item)}>Editar</button>
                      <button className="btn btn-outline-danger" onClick={() => eliminarItem(item.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      <ItemModal
        show={mostrarModal}
        handleClose={cerrarModal}
        handleSubmit={manejarEnvioFormulario}
        itemEditar={itemEditar}
        categorias={categorias}
      />
    </div>
  );
};

export default ItemsList;
