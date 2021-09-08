/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import LoginActions from '../actions/login.action';
import SystemConstants from '../constants/system.constants';
import ModalActions from '../actions/modal.action';
import RegistryWizard from '../pages/config/wizard';

import '../styles/components/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const openWizard = () => {
    const form = <RegistryWizard />;
    dispatch(ModalActions.Clean());
    dispatch(
      ModalActions.Form({ title: 'Sonar', form, size: 'lg', centered: false })
    );
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img
            src={SystemConstants.MAIN_LOGO}
            alt="logo"
            width="100"
            height="30"
          />
        </Link>
      </div>
      {user.loggedIn && (
        <>
          <div className="menu">
            <ul>
              <li>
                <Link to="/clients">Clientes</Link>
              </li>
              <li>
                <Link to="/providers">Proveedores</Link>
              </li>
              <li>
                <Link to="/payroll">Nómina</Link>
              </li>
              <li>Carga de informacion</li>
            </ul>
          </div>
          <div className="options-menu">
            <ul>
              <li>
                <i className="fas fa-bell" />
              </li>
              <li>
                <Link to="/settings">
                  <i className="fas fa-cog" />
                </Link>
              </li>
              <li>
                <div>Soporte</div>
              </li>
              <li>
                <i
                  className="fas fa-sign-out-alt"
                  onClick={() => dispatch(LoginActions.Logout())}
                />
              </li>
            </ul>
          </div>
        </>
      )}
      {!user.loggedIn && (
        <>
          <div className="menu">
            <ul>
              <li>Módulos</li>
              <li>Planes</li>
              <li>Acerca de nosotros</li>
              <li>Contáctanos</li>
            </ul>
          </div>
          <div className="options-menu">
            <ul>
              <li>
                <Link to="/login">
                  <Button variant="outline-primary" size="sm">
                    INGRESA AQUÍ
                  </Button>
                </Link>
              </li>
              <li>
                <Button variant="primary" size="sm" onClick={openWizard}>
                  COMIENZA AHORA
                </Button>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
