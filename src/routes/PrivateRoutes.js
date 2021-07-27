import React from 'react';

import ConfigurationLayout from '../components/ConfigurationLayout';
import UsersPage from '../pages/users';
import SellsByClient from '../pages/reports/sells/byClients';
import SellsByItems from '../pages/reports/sells/byItems/ReportByItems';
import TaxablePerceptions from '../pages/reports/payroll/taxablePerceptions';
import SellsByServices from '../pages/reports/sells/byServices';
import RetentionReport from '../pages/reports/retentions/retentionReport';

export default {
  Company: {
    component: <ConfigurationLayout />,
    path: '/settings',
  },
  Users: {
    component: <UsersPage />,
    path: '/users',
  },
  SellsReport: {
    path: '/reports/sells/by_client',
    component: <SellsByClient />,
  },
  SellsByItem: {
    path: '/reports/sells/by_items',
    component: <SellsByItems />,
  },
  SellsByServices: {
    path: '/reports/sells/by_services',
    component: <SellsByServices />,
  },
  TaxablesPerceptions: {
    path: '/reports/payroll/taxables_perceptions',
    component: <TaxablePerceptions />,
  },
  RetentionReport: {
    path: '/reports/retentions/',
    component: <RetentionReport />,
  },
};
