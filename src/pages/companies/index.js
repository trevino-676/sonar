import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import CompanyAction from '../../actions/company.action';
import ModalActions from '../../actions/modal.action';
import DataTable from '../../components/DataTable';
import CompanyForm from './CompanyForm';
import ButtonBar from '../../components/ButtonBar';
import DeleteForm from '../../components/DeleteForm';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import useFormatters from '../../hooks/useFormatters';

import '../../styles/pages/company.css';

const CompanyPage = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);
  const user = useSelector((state) => state.user);
  const { passwordFormatter, fieldFormatter } = useFormatters();
  const handleFormatter = (cell) => passwordFormatter(cell);
  const handleFieldFormatter = (cell) => fieldFormatter(cell);

  useEffect(() => {
    document.title = 'Empresas | Sonar32';
    const getData = () => {
      dispatch(CompanyAction.getCompaniesByUser());
    };
    getData();
  }, []);

  const deleteCompany = (id) => dispatch(CompanyAction.deleteCompany(id));
  const closeModal = () => dispatch(ModalActions.Clean());
  const openForm = () => {
    const form = (
      <CompanyForm
        modalClose={closeModal}
        labelButton="Agregar empresa"
        token={user.token}
      />
    );
    dispatch(ModalActions.Form({ title: 'Nueva empresa', form, size: 'lg' }));
  };
  const openModifyForm = (data) => {
    const form = (
      <CompanyForm
        modalClose={closeModal}
        labelButton="Modificar empresa"
        data={data}
        token={user.token}
      />
    );
    dispatch(
      ModalActions.Form({ title: 'Modificar empresa', form, size: 'lg' })
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
    const title = 'Eliminar empresa';
    dispatch(ModalActions.Form({ title, form, size: 'md' }));
  };
  const dataField = [
    {
      dataField: 'name',
      text: 'Razón social',
      align: 'center',
    },
    {
      dataField: 'rfc',
      text: 'RFC',
    },
    {
      dataField: 'fiel',
      text: 'Contraseña',
      formatter: handleFormatter,
      align: 'center',
    },
    {
      dataField: 'key_file',
      text: 'Clave privada',
      align: 'center',
      formatter: handleFieldFormatter,
    },
    {
      dataField: 'cer_file',
      text: 'Certificado',
      align: 'center',
      formatter: handleFieldFormatter,
    },
  ];

  const routes = [
    {
      name: 'Home',
      path: '/',
      active: false,
    },
    {
      name: 'Configuración',
      path: '/settings',
      active: false,
    },
    {
      name: 'Empresas',
      path: '/companies',
      active: true,
    },
  ];

  return (
    <Container>
      <BreadcrumbComponent routes={routes} />
      <h1 className="text-center">Configuración de empresas</h1>
      <div className="button-bar">
        <ButtonBar handleOpenForm={openForm} addLabel="Agregar empresa" />
      </div>
      {companies.companies !== undefined ? (
        <DataTable
          tableData={companies.companies}
          tableColumns={dataField}
          dataKey="ID"
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
