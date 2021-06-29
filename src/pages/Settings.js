import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import UserActions from '../actions/company.action';

import '../styles/pages/settings.css';

const Settings = ({ company }) => {
  const [data, setData] = useState({ cer: null, key: null, fiel: '' });
  const dispatch = useDispatch();

  const handleImputChange = (event) => {
    if (event.target.files) {
      setData({
        ...data,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const encodefielPassword = (fiel) =>
    window.btoa(unescape(encodeURIComponent(fiel)));

  const sendData = (event) => {
    event.preventDefault();
    const files = [];
    if (data.cer) {
      files.push(data.cer);
    }
    if (data.key) {
      files.push(data.key);
    }

    if (data.fiel) {
      dispatch(
        UserActions.saveFieldPassword(
          company.rfc,
          encodefielPassword(data.fiel)
        )
      );
    }

    if (files.length > 0) {
      dispatch(UserActions.uploadFile(files, company.rfc));
    }
  };

  return (
    <>
      <div className="settings-header">
        <div>
          <h2>Carga de documentos del SAT</h2>
        </div>
      </div>
      <p>Cambia tu contraseña FIEL y/o carga los archivos .cer y .key</p>
      <br />
      <br />
      <Form onSubmit={sendData}>
        <Form.Group controlId="formfielPassword">
          <Form.Label>Contraseña FIEL</Form.Label>
          <Form.Control
            type="password"
            placeholder="FIEL"
            onChange={handleImputChange}
            name="fiel"
          />
        </Form.Group>
        <Form.Group controlId="formCerFile">
          <Form.Label>Archivo .cer</Form.Label>
          <Form.File name="cer" id="cer" onChange={handleImputChange} />
        </Form.Group>
        <Form.Group controlId="formKeyFile">
          <Form.Label>Archivo .key</Form.Label>
          <Form.File name="key" id="key" onChange={handleImputChange} />
        </Form.Group>
        <Button variant="outline-success" type="submit">
          Guardar
        </Button>
      </Form>
    </>
  );
};

export default Settings;
