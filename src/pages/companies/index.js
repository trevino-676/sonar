import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import CompanyAction from '../../actions/company.action';
import ModalActions from '../../actions/modal.action';
import DataTable from '../../components/DataTable';
import CompanyForm from './CompanyForm';
import ButtonBar from '../../components/ButtonBar';
import DeleteForm from '../../components/DeleteForm';

import '../../styles/pages/company.css';

const CompanyPage = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    document.title = 'Companias | Sonar32';
    const getData = () => {
      dispatch(CompanyAction.getCompanies(user.token));
    };
    getData();
  }, []);

  const deleteCompany = (id) => dispatch(CompanyAction.deleteCompany(id));
  const closeModal = () => dispatch(ModalActions.Clean());
  const openForm = () => {
    const form = (
      <CompanyForm
        modalClose={closeModal}
        labelButton="Agregar compania"
        token={user.token}
      />
    );
    dispatch(ModalActions.Form({ title: 'Nueva compania', form, size: 'md' }));
  };
  const openModifyForm = (data) => {
    const form = (
      <CompanyForm
        modalClose={closeModal}
        labelButton="Modificar compania"
        data={data}
        token={user.token}
      />
    );
    dispatch(
      ModalActions.Form({ title: 'Modificar compania', form, size: 'md' })
    );
  };
  const deleteModal = (id) => {
    const form = (
      <DeleteForm
        onSubmit={deleteCompany}
        id={id}
        closeModal={closeModal}
        message="¿Estas seguro de eliminar esta empresa?"
        label="Eliminar"
      />
    );
    const title = 'Eliminar Compania';
    dispatch(ModalActions.Form({ title, form, size: 'md' }));
  };
  const dataField = [
    {
      dataField: '_id.$oid',
      text: 'ID',
    },
    {
      dataField: 'name',
      text: 'Nombre',
    },
    {
      dataField: 'rfc',
      text: 'RFC',
    },
    {
      dataField: 'address',
      text: 'Domicilio',
    },
  ];
  return (
    <Container>
      <h1 className="text-center">Empresas</h1>
      <div className="button-bar">
        <ButtonBar handleOpenForm={openForm} addLabel="Agregar empresa" />
      </div>
      {companies.companies !== undefined ? (
        <DataTable
          tableData={companies.companies}
          tableColumns={dataField}
          dataKey="_id.$oid"
          onModify={openModifyForm}
          onDelete={deleteModal}
        />
      ) : (
        <h2>cargando...</h2>
      )}
    </Container>
  );
};

export default CompanyPage;
