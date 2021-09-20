import React, { useState } from 'react';
import { Tabs, Tab, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import ModalActions from '../../../actions/modal.action';
import CompanyWizardPage from './company_wizard';
import NotificationsComponent from '../notifications';
import DeshboardsConfigComponent from '../dashboard';
import Scheduler from '../scheduler';

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
        <Tab eventKey="dashboard" title="Graficas">
          <DeshboardsConfigComponent config={config} />
        </Tab>
        <Tab eventKey="notification" title="Notificaciones">
          <NotificationsComponent config={config} />
        </Tab>
        <Tab eventKey="scheduler" title="Schedulers">
          <Scheduler config={config} />
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
