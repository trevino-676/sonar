import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import '../styles/pages/password_recovery.css';

const PasswordRecovery = () => {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const handleChange = (event) => setEmail(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <div className="recovery">
      <div className="recovery-main">
        <div className="recovery-header">
          <h2>Recupera tu contraseña</h2>
          <p>
            Ingresa tu direccion de correo electronico y sigue las instrucciones
            que te haremos llegar.
          </p>
        </div>
        <div className="recovery-content">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="correo "
            />
            <Button variant="primary" type="submit">
              Enviar Correo
            </Button>
          </form>
        </div>
        <div className="recovery-footer">
          <Link to="/">Regresar al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
