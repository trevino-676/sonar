import React, { useState } from 'react';
import { Tabs, Tab, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import ModalActions from '../../../actions/modal.action';
import CompanyWizardPage from './company_wizard';

const RegistryWizard = ({ config }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('company');
  const closeModal = () => dispatch(ModalActions.Clean());
  return (
    <>
      <Tabs
        id="controlled-tab-wizard"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="company" title="Empresas">
          <CompanyWizardPage config={config} handleNextTab={setKey} />
        </Tab>
        <Tab eventKey="notification" title="Notificaciones">
          <h1>Notificaciones</h1>
        </Tab>
        <Tab eventKey="scheduler" title="Schedulers">
          <h1>Scheduler</h1>
        </Tab>
      </Tabs>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RegistryWizard;
