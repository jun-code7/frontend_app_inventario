// src/pages/CategoriaDetalle.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CategoriaDetalle() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resCat = await api.get(`/categorias/${id}`);
      setCategoria(resCat.data);

      const resItems = await api.get(`/items?categoria_id=${id}`);
      setItems(resItems.data);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      {categoria && (
        <>
          <h4>Items de la Categoría: {categoria.nombre}</h4>
          <p className="text-muted">{categoria.descripcion}</p>
        </>
      )}
        <br />
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre del Ítem</th>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="4" className="text-center">Cargando...</td></tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.cantidad}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
