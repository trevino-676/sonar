import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const CommonModal = ({size, header, content, footer}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size={size}
        aria-labelledby="conatined-modal-title-vcenter"
        centered
      >
          <Modal.Header closeButton>
              <Modal.Title>
                  { header }
              </Modal.Title>
              <Modal.Body>
                  { content }
              </Modal.Body>
              <Modal.Footer>
                  { footer }
              </Modal.Footer>
          </Modal.Header>
      </Modal>
    </>
  );
};

export default CommonModal;
