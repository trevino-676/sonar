import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import CommonModal from './modal';

// Aqui se importan los estilos del Layout
import '../styles/components/Layout.css';

const Layout = ({ children }) => {
  const modal = useSelector((state) => state.modal);
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
      <CommonModal
        header={modal.title}
        content={modal.form ? modal.form : modal.body}
        footer={modal.footer}
        show={modal.show}
        size={modal.size}
      />
    </>
  );
};

export default Layout;
