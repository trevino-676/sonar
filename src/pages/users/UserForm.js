import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

const UserForm = ({ modalClose, labelButton, onHandleSubmit, data = null }) => {
  const [user, setUser] = useState({
    _id: data ? data._id.$oid : undefined,
    name: data ? data.name : '',
    last_name: data ? data.last_name : '',
    email: data ? data.email : '',
    rfc: data ? data.rfc : '',
    password: data ? data.password : '',
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <Form.Group as={Row}>
        <Form.Control type="text" hidden name="_id" defaultValue={user._id} />
        <Form.Label column sm={3}>
          Nombre:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="nombre"
            onChange={handleInputChange}
            name="name"
            value={user.name}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Apellidos:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="apellido"
            onChange={handleInputChange}
            name="last_name"
            value={user.last_name}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Correo Electronico:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="correo electronico"
            onChange={handleInputChange}
            name="email"
            value={user.email}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Rfc:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="rfc"
            onChange={handleInputChange}
            name="rfc"
            value={user.rfc}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Contraseña:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="password"
            placeholder="contraseña"
            onChange={handleInputChange}
            name="password"
            value={user.password}
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

export default UserForm;
