import { useState } from 'react';
import api from '../services/api';

export default function CategoriaForm({ onCategoriaCreada }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categorias', { nombre, descripcion });
      setMensaje({ tipo: 'success', texto: 'Categoría creada con éxito' });
      setNombre('');
      setDescripcion('');
      if (onCategoriaCreada) onCategoriaCreada(); // Notifica al padre
    } catch (error) {
      console.error(error);
      setMensaje({ tipo: 'danger', texto: 'Hubo un error al crear la categoría' });
    }
  };

  return (
    <div className="mb-4">
      <h4>Crear nueva categoría</h4>
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}
