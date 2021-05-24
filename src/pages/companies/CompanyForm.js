import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

const CompanyForm = ({ handleSubmit, modalClose, labelButton, updateCompany=null }) => {
  const [company, setCompany] = useState({
    name: updateCompany.name || '',
    rfc: updateCompany.rfc || '',
    address: updateCompany.address || '',
    users: updateCompany.users || [],
  });

  const handleInputChange = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Nombre:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="nombre"
            onChange={handleInputChange}
            name="name"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          RFC:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="rfc"
            onChange={handleInputChange}
            name="rfc"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Direccion:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="direccion"
            onChange={handleInputChange}
            name="address"
          />
        </Col>
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalClose}>
          Cancelar
        </Button>
        <Button type="submit">{labelButton}</Button>
      </Modal.Footer>
    </form>
  );
};

export default CompanyForm;
