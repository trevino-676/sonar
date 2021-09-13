import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserActions from '../../actions/user.action';

import '../../styles/pages/userRegistry.css';

const UserRegistry = () => {
  const [user, setUser] = useState({
    name: null,
    email: null,
    password: null,
  });
  const dispatch = useDispatch();
  const onHandleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(UserActions.saveUser(user));
  };

  return (
    <div className="registry-area">
      <div className="registry">
        <div className="registry-title">
          <h2>Registro</h2>
          <p>Proporciona tus datos para realizar tu registro</p>
        </div>
        <div className="registry-form">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Ingresa tu nombre"
              onChange={onHandleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu correo electronico"
              onChange={onHandleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              onChange={onHandleChange}
            />
            <Button variant="primary" type="submit">
              Aceptar
            </Button>
          </form>
        </div>
        <div className="registry-footer">
          <Link to="/">Regresa al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegistry;
