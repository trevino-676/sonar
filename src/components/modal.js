import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import ModalActions from '../actions/modal.action';

const CommonModal = ({
  size,
  header,
  content,
  footer,
  show,
  centered = true,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(ModalActions.Clean());
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      animation={false}
      size={size}
      aria-labelledby="conatined-modal-title-vcenter"
      centered={centered}
    >
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      {!footer ? (
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cerrar
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default CommonModal;
