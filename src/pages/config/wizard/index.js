import React, { useState } from 'react';
import { Tabs, Tab, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import ModalActions from '../../../actions/modal.action';
import ConfigActions from '../../../actions/config.action';
import CompanyWizardPage from './company_wizard';
import NotificationsComponent from '../notifications';
import DeshboardsConfigComponent from '../dashboard';
import Scheduler from '../scheduler';
import CuentasComponent from '../cuentas';

const RegistryWizard = ({ config }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('company');
  const closeModal = () => {
    const data = { ...config, wizzard: false };
    dispatch(ConfigActions.updateUSerConfig(data));
    dispatch(ModalActions.Clean());
    dispatch(ConfigActions.getUserConfig());
  };
  const changeTab = () => {
    switch (key) {
      case 'company':
        setKey('dashboard');
        break;
      case 'dashboard':
        setKey('notification');
        break;
      case 'notification':
        setKey('scheduler');
        break;
      case 'scheduler':
        setKey('cuenta');
        break;
      case 'cuenta':
        closeModal();
      default:
        break;
    }
  };
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
        <Tab eventKey="cuenta" title="Cuentas">
          <CuentasComponent config={config}/>
        </Tab>
      </Tabs>
      <Modal.Footer>
        <Button variant="primary" onClick={changeTab}>
          Siguiente
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RegistryWizard;
