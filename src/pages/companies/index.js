import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import CompanyAction from '../../actions/company.action';
import ModalActions from '../../actions/modal.action';
import DataTable from '../../components/DataTable';
import CompanyForm from './CompanyForm';
import ButtonBar from '../../components/ButtonBar';

import '../../styles/pages/company.css';

const CompanyPage = () => {
  const [selectedRow, setSelectedRow] = useState([]);
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

  const deleteCompany = () =>
    dispatch(CompanyAction.deleteCompany(selectedRow[0]._id.$oid, user.token));
  const handleGetChildrenState = (data) => setSelectedRow(data);
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
        <ButtonBar
          handleOpenForm={openForm}
          handleDeleteForm={deleteCompany}
          addLabel="Agregar empresa"
          deleteLabel="Eliminar empresa"
        />
      </div>
      {companies.companies !== undefined ? (
        <DataTable
          tableData={companies.companies}
          tableColumns={dataField}
          dataKey="_id.$oid"
          onModify={openModifyForm}
          onSelected={handleGetChildrenState}
        />
      ) : (
        <h2>cargando...</h2>
      )}
    </Container>
  );
};

export default CompanyPage;
