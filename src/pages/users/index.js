import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import UserActions from '../../actions/user.action';
import ModalActions from '../../actions/modal.action';
import DataTable from '../../components/DataTable';
import UserForm from './UserForm';
import DeleteForm from '../../components/DeleteForm';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const deleteUser = (id) => dispatch(UserActions.deleteUser(id));
  const closeModal = () => dispatch(ModalActions.Clean());
  const onModifySubmit = (user) => dispatch(UserActions.updateUser(user));
  const modifyForm = (data) => {
    const form = (
      <UserForm
        modalClose={closeModal}
        labelButton="Modificar usuario"
        data={data}
        onHandleSubmit={onModifySubmit}
      />
    );
    dispatch(
      ModalActions.Form({ title: 'Modificar usuario', form, size: 'md' })
    );
  };
  const deleteModal = (id) => {
    const form = (
      <DeleteForm
        onSubmit={deleteUser}
        id={id}
        message="¿Deseas eliminar al usuario?"
        label="Eliminar"
        closeModal={closeModal}
      />
    );
    const title = 'Eliminar usuario';
    dispatch(ModalActions.Form({ title, form, size: 'md' }));
  };

  const datafield = [
    {
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'name',
      text: 'Nombre',
    },
    {
      dataField: 'last_name',
      text: 'Apellidos',
    },
    {
      dataField: 'rfc',
      text: 'Rfc',
    },
  ];

  useEffect(() => {
    document.title = 'Usuarios | Sonar32';
    const getData = () => {
      dispatch(UserActions.getUsers());
    };
    getData();
  }, []);

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
      name: 'Usuarios',
      path: '/users',
      active: true,
    },
  ];

  return (
    <Container>
      <h1 className="text-center">Configuración de usuarios</h1>
      <BreadcrumbComponent routes={routes} />
      {users.user_list && (
        <DataTable
          tableData={users.user_list}
          tableColumns={datafield}
          dataKey="_id.$oid"
          onModify={modifyForm}
          onDelete={deleteModal}
        />
      )}
    </Container>
  );
};

export default UsersPage;
