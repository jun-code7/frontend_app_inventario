import { useEffect, useState } from 'react'; 
import api from '../services/api';
import CategoriaModal from './CategoriaModal';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';



export default function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);


  const fetchCategorias = async () => {
    const res = await api.get('/categorias');
    setCategorias(res.data);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);
  
  
  const confirmarEliminacion = (id) => {
    setIdAEliminar(id);
    setMostrarModalConfirmacion(true);
  };
  
  const ejecutarEliminacion = async () => {
    try {
      await api.delete(`/categorias/${idAEliminar}`);
      toast.info('Categoría eliminada');
      fetchCategorias();
    } catch {
      toast.error('Error al eliminar la categoría');
    } finally {
      setMostrarModalConfirmacion(false);
      setIdAEliminar(null);
    }
  };

  const abrirModal = (categoria = null) => {
    setCategoriaEditar(categoria);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setCategoriaEditar(null);
    setMostrarModal(false);
  };

  const manejarEnvioFormulario = async (formData) => {
    try {
      if (categoriaEditar) {
        await api.put(`/categorias/${categoriaEditar.id}`, formData);
        toast.success('Categoría actualizada correctamente');
      } else {
        await api.post('/categorias', formData);
        toast.success('Categoría creada exitosamente');
      }
      cerrarModal();
      fetchCategorias();
    } catch (error) {
      toast.error('Error al guardar la categoría');
      console.error('Error al guardar la categoría:', error);
    }
  };

  return (

    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Lista de Categorías</h4>
        <Button variant="success" onClick={() => abrirModal()}>Agregar Categoría</Button>
      </div>

      <div className="table-responsive">
        <ul className="list-group list-group-flush border rounded overflow-hidden">
          {/* Encabezado estilo tabla */}
          <li className="list-group-item bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
            <div className="d-flex" style={{ width: "100%" }}>
              <span style={{ width: "50px" }}>#</span>
              <span>Nombre / Descripción</span>
            </div>
            <div style={{ width: "120px" }} className="text-end">
              Acciones
            </div>
          </li>
          
          {/* Filas de datos ordenadas alfabéticamente */}
          {categorias.length === 0 ? (
            <li className="list-group-item text-center">No hay categorías disponibles</li>
          ) : (
            [...categorias]
              .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente
              .map((cat, index) => (
                <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center hover-effect">
                  <div className="d-flex" style={{ width: "100%" }}>
                    <span style={{ width: "50px" }}>{index + 1}</span>
                    <div className="d-flex flex-column">
                      <strong>{cat.nombre}</strong>
                      <span className="text-muted small">{cat.descripcion}</span>
                    </div>
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary" onClick={() => abrirModal(cat)}>Editar</button>
                    <button className="btn btn-outline-danger" onClick={() => confirmarEliminacion(cat.id)}>Eliminar</button>
                  </div>
                </li>
              ))
          )}
        </ul>
      </div>

      <CategoriaModal
        show={mostrarModal}
        handleClose={cerrarModal}
        handleSubmit={manejarEnvioFormulario}
        categoriaEditar={categoriaEditar}
      />
      
      
      {/* Modal de Confirmación */}
      {mostrarModalConfirmacion && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModalConfirmacion(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setMostrarModalConfirmacion(false)}>Cancelar</button>
                <button className="btn btn-danger" onClick={ejecutarEliminacion}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}
