import React from 'react';

import Settings from '../pages/Settings';
import CompanyPage from '../pages/companies';
import UsersPage from '../pages/users';
import SellsByClient from '../pages/reports/sells/byClients';
import SellsByItems from '../pages/reports/sells/byItems/ReportByItems';
import TaxablePerceptions from '../pages/reports/payroll/taxablePerceptions';
import SellsByServices from '../pages/reports/sells/byServices';

export default {
  Settings: {
    component: <Settings />,
    path: '/settings',
  },
  Company: {
    component: <CompanyPage />,
    path: '/companies',
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
};
