/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import UploadAccountStatmentAction from '../../actions/uploadAccountStatement.action';
import AccountStatmentsConstants from '../../constants/AcountStatments.constants';
import useReportTitle from '../../hooks/useReportTitle';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import SelectComponent from '../../components/SelectInputComponent';

import '../../styles/pages/account_statments/upload.css';

const breadcrumbRoutes = [
  { name: 'Inicio', path: '/' },
  { name: 'Carga de estados de cuenta', path: '/account/statment/upload' },
];

const bankOptions = [
  { text: 'Afirma', value: 'afirma' },
  { text: 'Banorte', value: 'banorte' },
  { text: 'Banregio', value: 'banregio' },
  { text: 'BBVA', value: 'bbva' },
  { text: 'Citibanamex', value: 'citibanamex' },
  { text: 'HSBC', value: 'hsbc' },
  { text: 'Santander', value: 'santander' },
  { text: 'Scotiabank', value: 'scotiabank' },
];

const UploadAccoutnStatments = () => {
  const [bank, setBank] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  useReportTitle(AccountStatmentsConstants.PAGE_TITLE);

  const handleChangeBank = (event) => {
    setBank(event.target.value);
  };

  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(UploadAccountStatmentAction.UploadAccountStatment(bank, file));
  };

  return (
    <>
      <BreadcrumbComponent routes={breadcrumbRoutes} />
      <div className="page_header">
        <h1 className="title">Carga los estados de cuenta</h1>
      </div>
      <div className="page_content">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="bank">Banco:</label>
            <SelectComponent
              data={bankOptions}
              name="bank"
              id="bank"
              handleChange={handleChangeBank}
              defaultData={bank}
              className="select"
            />
          </div>
          <div className="input-group">
            <Form.File name="file" id="file" onChange={handleChangeFile} />
          </div>
          <div className="input-group">
            <Button variant="outline-primary" type="submit">
              Cargar archivo
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadAccoutnStatments;
