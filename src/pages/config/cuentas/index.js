import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';``

import CuentasAction from '../../../actions/cuentas.action';
import ModalActions from '../../../actions/modal.action';
import DataTable from '../../../components/DataTable';
import Cuentas from './Cuentas';
import ButtonBar from '../../../components/ButtonBar';
import DeleteForm from '../../../components/DeleteForm';


//import '../../styles/pages/config/cuentas.css';

const CuentasComponent = ({ config }) => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.accounts);
  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    document.title = 'Cuentas | Sonar32';
    const getData = () => {
      dispatch(CuentasAction.getCuentaByUser());
    };
    getData();
  }, []); 

  const deleteCuenta = (id) => dispatch(CuentasAction.deleteCuenta(id));
  const closeModal = () => dispatch(ModalActions.Clean());
  const openForm = () => {
    const form = (
      <Cuentas
        modalClose={closeModal}
        labelButton="Agregar cuenta"
        token={user.token}
      />
    );
    dispatch(ModalActions.Form({ title: 'Nueva cuenta', form, size: 'lg' }));
  };
  const openModifyForm = (data) => {
    const form = (
      <CuentaForm
        modalClose={closeModal}
        labelButton="Modificar cuenta"
        data={data}
        token={user.token}
      />
    );
    dispatch(
      ModalActions.Form({ title: 'Modificar cuenta', form, size: 'lg' })
    );
  };
  const deleteModal = (id) => {
    const form = (
      <DeleteForm
        onSubmit={deleteCuenta}
        id={id}
        closeModal={closeModal}
        message="¿Estas seguro de eliminar esta cuenta?"
        label="Eliminar"
      />
    );
    const title = 'Eliminar cuenta';
    dispatch(ModalActions.Form({ title, form, size: 'md' }));
  };

  const data = accounts.map((item) => {
    if (item.name === config.main_account) return { ...item, fav: true };
    return { ...item, fav: false };
  });

  const dataField = [
    {
      dataField: 'fav',
      text: '',
      formatter: (cell) => (
        <>
          {cell ? <i className="fas fa-star" /> : <i className="far fa-star" />}
        </>
      ),
    },
    {
      dataField: 'company',
      text: 'RFC',
      align: 'center',
    },
    {
      dataField: 'bank',
      text: 'Banco',
    },
    {
      dataField: 'cuenta',
      text: 'Numero de Cuenta',
    },
  ];

  return (
    <Container>
      <div className="button-bar">
        <ButtonBar handleOpenForm={openForm} addLabel="Agregar cuenta" />
      </div>
      {data !== undefined ? (
        <DataTable
          tableData={data}
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

export default CuentasComponent;
