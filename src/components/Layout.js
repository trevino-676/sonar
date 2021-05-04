import React from 'react';

import Header from './Header';
import Footer from './Footer';

// Aqui se importan los estilos del Layout
import '../styles/components/Layout.css';

const Layout = ({children}) => (
    <div className="main">
        <Header />
        {children}
        <Footer />
    </div>
);

export default Layout;