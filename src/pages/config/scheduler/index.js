import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import SchedulerComponent from './scheduler';
import ReminderScheduler from './reminders';
import RPAScheduler from './rpa';

const Scheduler = ({ config }) => (
  <>
    <Tabs defaultActiveKey="dashboard" className="mb-3">
      <Tab eventKey="dashboard" title="Dashboard">
        <SchedulerComponent config={config} />
      </Tab>
      <Tab eventKey="recordatorios" title="Recordatorios">
        <ReminderScheduler config={config} />
      </Tab>
      <Tab eventKey="rpa" title="Descarga de informacion">
        <RPAScheduler config={config}/>
      </Tab>
      <Tab eventKey="reportes" title="Reportes automaticos" disabled>
        <h1>Reportes</h1>
      </Tab>
    </Tabs>
  </>
);

export default Scheduler;
