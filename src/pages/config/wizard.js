import React, { useState } from 'react';
import { Tabs, Tab, ProgressBar } from 'react-bootstrap';

const RegistryWizard = () => {
  const [key, setKey] = useState('registry');

  return (
    <Tabs
      id="controlled-tab-wizard"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="registry" title="Registro">
        <h1>Registro</h1>
      </Tab>
      <Tab eventKey="company" title="Empresas">
        <h1>Empresas</h1>
      </Tab>
      <Tab eventKey="notification" title="Notificaciones">
        <h1>Notificaciones</h1>
      </Tab>
      <Tab eventKey="scheduler" title="Schedulers">
        <h1>Scheduler</h1>
      </Tab>
    </Tabs>
  );
};

export default RegistryWizard;
