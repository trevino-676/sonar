import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ButtonToolbar, Button } from 'react-bootstrap';

import CompanyAction from '../../actions/company.action';
import ModalActions from '../../actions/modal.action';
import DataTable from '../../components/DataTable';
import CompanyForm from './CompanyForm';

const CompanyPage = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const companies = useSelector((state) => state.companies);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (companies.length === 0) {
    if (user.userId) {
      dispatch(CompanyAction.getCompanies('and', { user: user.userId }));
    } else {
      dispatch(CompanyAction.getCompanies());
    }
  }

  const createCompany = (data) => CompanyAction.createCompany(data);
  const updateCompany = (data) => CompanyAction.updateCompany(data);
  const deleteCompany = (id) => CompanyAction.deleteCompany(id);
  const handleGetChildrenState = (data) => setSelectedRow(data);
  const closeModal = () => dispatch(ModalActions.Clean());
  const openForm = (handleFunc, handleClose, label, title, company = null) => {
    const form = (
      <CompanyForm
        handleSubmit={handleFunc}
        modalClose={handleClose}
        labelButton={label}
        updateCompany={company}
      />
    );
    dispatch(ModalActions.Form({ title, form, size: 'md' }));
  };

  return (
    <Container>
      <h1 className="text-center">Compañias</h1>
      <ButtonToolbar>
        <Button
          variant="outline-primary"
          onClick={openForm(
            createCompany,
            closeModal,
            'Agregar',
            'Nueva compania'
          )}
        >
          Agregar
        </Button>
        <Button variant="outline-danger" >Eliminar</Button>
      </ButtonToolbar>
    </Container>
  );
};

export default CompanyPage;