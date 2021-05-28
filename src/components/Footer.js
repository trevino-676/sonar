import React from 'react';
import { Navbar } from 'react-bootstrap';

// importar estilos de Footer
import '../styles/components/Footer.css';

const Footer = () => (
  <Navbar fixed="bottom">
    <Navbar.Brand href="https://drumbot.com.mx/">Drumbot</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>Todos los derechos reservados.</Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default Footer;
