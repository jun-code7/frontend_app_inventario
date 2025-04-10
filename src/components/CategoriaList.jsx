import { useEffect, useState } from 'react';
import api from '../services/api';
import CategoriaForm from './CategoriaForm';

export default function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');

  const fetchCategorias = async () => {
    const res = await api.get('/categorias');
    setCategorias(res.data);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const eliminarCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      await api.delete(`/categorias/${id}`);
      fetchCategorias();
    }
  };

  const activarEdicion = (categoria) => {
    setEditandoId(categoria.id);
    setEditNombre(categoria.nombre);
    setEditDescripcion(categoria.descripcion);
  };

  const guardarEdicion = async (id) => {
    await api.put(`/categorias/${id}`, {
      nombre: editNombre,
      descripcion: editDescripcion,
    });
    setEditandoId(null);
    fetchCategorias();
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setEditNombre('');
    setEditDescripcion('');
  };

  return (
    <div className="container mt-4">

      <h3>Lista de Categorías</h3>
      <ul className="list-group">
        {categorias.map(cat => (
          <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editandoId === cat.id ? (
              <div className="w-100">
                <input
                  className="form-control mb-1"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  value={editDescripcion}
                  onChange={(e) => setEditDescripcion(e.target.value)}
                />
                <button className="btn btn-success btn-sm me-2" onClick={() => guardarEdicion(cat.id)}>Guardar</button>
                <button className="btn btn-secondary btn-sm" onClick={cancelarEdicion}>Cancelar</button>
              </div>
            ) : (
                <div className="d-flex justify-content-between align-items-center mb-2 w-100" style={{ minHeight: '3rem' }}>
  <div className="flex-grow-1 me-3">
    <div className="d-flex flex-column justify-content-center">
      <strong>{cat.nombre}</strong>
      <span>{cat.descripcion}</span>
    </div>
  </div>
  <div className="btn-group btn-group-sm flex-shrink-0" role="group">
    <button className="btn btn-outline-primary" onClick={() => activarEdicion(cat)}>Editar</button>
    <button className="btn btn-outline-danger" onClick={() => eliminarCategoria(cat.id)}>Eliminar</button>
  </div>

</div>
   
            )}
          </li>
        ))}
      </ul>
      <hr/>
      <CategoriaForm onCategoriaCreada={fetchCategorias} />
    </div>
  );
}
