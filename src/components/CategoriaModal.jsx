// src/components/CategoriaModal.jsx
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function CategoriaModal({ show, handleClose, handleSubmit, categoriaEditar }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (categoriaEditar) {
      setNombre(categoriaEditar.nombre);
      setDescripcion(categoriaEditar.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [categoriaEditar]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ nombre, descripcion });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{categoriaEditar ? 'Editar Categoría' : 'Agregar Categoría'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">
            {categoriaEditar ? 'Guardar Cambios' : 'Crear Categoría'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
