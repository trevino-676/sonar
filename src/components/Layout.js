import React from 'react';
import { useSelector } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import CommonModal from './modal';

// Aqui se importan los estilos del Layout
import '../styles/components/Layout.css';

const Layout = ({ children }) => {
  const modal = useSelector((state) => state.modal);
  return (
    <div className="main">
      <Header />
      {children}
      <Footer />
      <CommonModal
        header={modal.title}
        content={modal.form ? modal.form : modal.body}
        footer={modal.footer}
        show={modal.show}
        size={modal.size}
      />
    </div>
  );
};

export default Layout;
