import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LoginActions from '../actions/login.action';

// Importar estilos del Header
import '../styles/components/Header.css';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      className="header"
      sticky="top"
    >
      <Navbar.Brand>
        <Link to="/">Sonar 32</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mr-auto">
        {user.loggedIn ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <NavDropdown title="Catalogos" id="collasible-navbar-nav">
            </NavDropdown> */}
            <NavDropdown title="Productos" id="collasible-navbar-nav">
              <NavDropdown.Item href="#Example">
                Producto Ejemplo
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Servicios" id="collasible-navbar-nav">
              <NavDropdown.Item href="#Example">
                Servicio Ejemplo
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="usuario" id="collasible-navbar-nav">
              <NavDropdown.Item href="/users">Usuarios</NavDropdown.Item>
              <NavDropdown.Item href="/companies">Empresas</NavDropdown.Item>
              <NavDropdown.Item href="/settings">
                Configuracion
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(LoginActions.Logout())}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link href="/registry">Registro</Nav.Link>
            <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
          </Navbar.Collapse>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
