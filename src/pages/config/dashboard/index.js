import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import '../../../styles/pages/config/notifications.css';
import ClientsConfig from './ClientesTab';
import HomeConfig from './HomeTab';
import ProvidersConfig from './ProvidersTab';

const DeshboardsConfigComponent = ({ config }) => (
  <>
    <Tabs defaultActiveKey="dashboard" className="mb-3">
      <Tab eventKey="dashboard" title="Menú inicial">
        <HomeConfig config={config} />
      </Tab>
      <Tab eventKey="clients" title="Clientes">
        <ClientsConfig config={config} />
      </Tab>
      <Tab eventKey="providers" title="Proveedores">
        <ProvidersConfig config={config} />
      </Tab>
    </Tabs>
  </>
);

export default DeshboardsConfigComponent;
