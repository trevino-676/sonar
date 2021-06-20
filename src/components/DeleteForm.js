import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteForm = ({ onSubmit, id, closeModal, message, label }) => (
  <form onSubmit={() => onSubmit(id)} className="form-horizontal">
    <p className="text-center">{message}</p>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeModal}>
        Cancelar
      </Button>
      <Button type="submit" variant="danger">
        {label}
      </Button>
    </Modal.Footer>
  </form>
);

export default DeleteForm;
