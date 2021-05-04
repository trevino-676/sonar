import React from 'react';
import { Link } from 'react-router-dom';

// Importar estilos del Header
import '../styles/components/Header.css';

const Header = () => (
    <div className="header">
        <h1 className="header-title"><Link to="/">Sonar 32</Link></h1>
    </div>
)

export default Header;