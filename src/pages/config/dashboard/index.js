import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import HomeConfig from './HomeTab';

import '../../../styles/pages/config/notifications.css';

const DeshboardsConfigComponent = ({ config }) => (
  <>
    <Tabs defaultActiveKey="dashboard" className="mb-3">
      <Tab eventKey="dashboard" title="Dashboard">
        <HomeConfig config={config} />
      </Tab>
    </Tabs>
  </>
);

export default DeshboardsConfigComponent;
