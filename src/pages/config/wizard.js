import React, { useState } from 'react';
import { Tabs, Tab, ProgressBar, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import ModalActions from '../../actions/modal.action';
import UserRegistry from '../users/register';
import CompanyPage from '../companies';

const RegistryWizard = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('registry');
  const closeModal = () => dispatch(ModalActions.Clean());
  return (
    <>
      <Tabs
        id="controlled-tab-wizard"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="registry" title="Registro">
          <UserRegistry />
        </Tab>
        <Tab eventKey="company" title="Empresas">
          {/* <CompanyPage /> */}
          <h2>Empresas</h2>
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
