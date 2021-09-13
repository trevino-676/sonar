import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import ConfigActions from '../../../actions/config.action';
import CompanyActions from '../../../actions/company.action';

import '../../../styles/pages/config/company_wizard.css';

const CompanyWizardPage = ({ config, handleNextTab }) => {
  const dispatch = useDispatch();
  const name = useRef('');
  const rfc = useRef('');
  const address = useRef('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const company = {
      name: name.current.value,
      rfc: rfc.current.value,
      address: address.current.value,
    };
    const configData = { ...config, main_company: company.rfc };
    dispatch(
      CompanyActions.createCompany(company, localStorage.getItem('token'))
    );
    // dispatch(ConfigActions.updateUSerConfig(configData));
    handleNextTab('notification');
  };

  return (
    <div className="company-wizard">
      <h3>Registra tu primera empresa.</h3>
      <p>Despues podras modificarla y/o agregar mas empresas</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={name}
          placeholder="Ingresa el nombre de la empresa"
        />
        <input
          type="text"
          ref={rfc}
          placeholder="Ingresa el RFC de la empresa"
        />
        <input
          type="text"
          ref={address}
          placeholder="Ingresa la direccion de la empresa"
        />
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default CompanyWizardPage;
