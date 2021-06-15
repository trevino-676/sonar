import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import CompanyAction from '../../actions/company.action';

const CompanyForm = ({ modalClose, labelButton, token, data = null }) => {
  const [company, setCompany] = useState({
    _id: data ? data._id.$oid : undefined,
    name: data ? data.name : '',
    rfc: data ? data.rfc : '',
    address: data ? data.address : '',
    users: data ? data.users : [],
  });
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    });
  };

  const createCompany = () =>
    dispatch(CompanyAction.createCompany(company, token));
  const updateCompany = () =>
    dispatch(CompanyAction.updateCompany(company, token));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data) {
      createCompany();
    } else {
      updateCompany();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <Form.Group as={Row}>
        <Form.Control
          type="text"
          hidden
          name="_id"
          defaultValue={company._id}
        />
        <Form.Label column sm={3}>
          Nombre:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="nombre"
            onChange={handleInputChange}
            name="name"
            value={company.name}
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
            value={company.rfc}
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
            value={company.address}
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
