import React, { useState } from 'react';
import { Form , Button} from 'react-bootstrap';

import '../styles/pages/settings.css';

const Settings = () => {
  const user = { name: 'Luis Manuel', last_name: 'Torres Treviño' };
  const [data, setData] = useState({ cer: '', key: '', field: '' });

  const handleImputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = (event) => {
    event.preventDefault();
    console.log(`enviando datos... ${data.cer} ${data.key} ${data.field}`);
  };

  return (
    <>
      <div className="settings-header">
        <div>
          <h2>Configuración</h2>
        </div>
        <div>{user.name}</div>
      </div>
      <p>Cambia tu contraseña field y/o carga los archivos .cer y .key</p>
      <br />
      <br />
      <Form onSubmit={sendData}>
        <Form.Group controlId="formFieldPassword">
          <Form.Label>Contraseña field</Form.Label>
          <Form.Control
            type="password"
            placeholder="field"
            onChange={handleImputChange}
            name="field"
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
        <Button variant="outline-success" type="submit">Guardar</Button>
      </Form>
    </>
  );
};

export default Settings;
