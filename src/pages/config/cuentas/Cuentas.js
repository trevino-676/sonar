import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import CuentasAction from '../../../actions/cuentas.action';

//import '../../styles/pages/config/cuentas.css'

const Cuentas = ({ modalClose, labelButton, token, data = null }) => {
  const[account, setCuenta] = useState({
    _id: data ? data._id.$oid : undefined,
    company: data ? data.company : '',
    bank: data ? data.bank : '',
    cuenta: data ? data.cuenta : '',
  });
 

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
      setCuenta({
        ...account,
        [event.target.name]: event.target.value,
      });
    console.log(account)
  };

  const createCuenta = () =>
    dispatch(CuentasAction.createCuenta(account, token));
  const updateCuenta = () =>
    dispatch(CuentasAction.updateCuenta(account, token));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data) {
      createCuenta();
    } else {
      updateCuenta();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <Form.Group as={Row}>
        <Form.Control
          type="text"
          hidden
          name="_id"
          defaultValue={account._id}
        />
        <Form.Label column sm={3}>
          Nombre:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre de la empresa"
            onChange={handleInputChange}
            name="company"
            value={account.company}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Nombre del banco:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre del banco"
            onChange={handleInputChange}
            name="bank"
            value={account.bank}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Numero de Cuenta:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="Ingresa el numero de cuenta"
            onChange={handleInputChange}
            name="cuenta"
            value={account.cuenta}
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

export default Cuentas;
