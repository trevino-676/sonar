import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import UserActions from '../../actions/user.action';
import ModalActions from '../../actions/modal.action';
import DataTable from '../../components/DataTable';
import ButtonBar from '../../components/ButtonBar';
import UserForm from './UserForm';

const UsersPage = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const deleteCompany = () =>
    dispatch(UserActions.deleteUser(selectedRow[0]._id.$oid));
  const handleGetChildrenState = (data) => setSelectedRow(data);
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

  return (
    <Container>
      <h1 className="text-center">Usuarios</h1>
      <ButtonBar
        handleDeleteForm={deleteCompany}
        deleteLabel="Eliminar usuario"
      />
      {users.user_list && (
        <DataTable
          tableData={users.user_list}
          tableColumns={datafield}
          dataKey="_id.$oid"
          onModify={modifyForm}
          onSelected={handleGetChildrenState}
        />
      )}
    </Container>
  );
};

export default UsersPage;
