import React from 'react';

import ConfigurationLayout from '../components/ConfigurationLayout';
import UsersPage from '../pages/users';
import SellsByClient from '../pages/reports/sells/byClients';
import SellsByItems from '../pages/reports/sells/byItems/ReportByItems';
import TaxablePerceptions from '../pages/reports/payroll/taxablePerceptions';
import SellsByServices from '../pages/reports/sells/byServices';
import RetentionReport from '../pages/reports/retentions/retentionReport';
import OpinionReport from '../pages/reports/opinion/opinionReport';
import HomePrivate from '../pages/dashboards/home';
import ClientDashboard from '../pages/dashboards/clients';
import ProviderDashboard from '../pages/dashboards/providers';
import PayrollDashboard from '../pages/dashboards/payroll';
import DetailedReport from '../pages/reports/DetailedReport';

export default {
  Home: {
    component: <HomePrivate />,
    path: '/',
  },
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
  OpinionReport: {
    path: '/reports/opinion',
    component: <OpinionReport />,
  },
  ClientDashboard: {
    path: '/clients',
    component: <ClientDashboard />,
  },
  ProviderDashboard: {
    path: '/providers',
    component: <ProviderDashboard />,
  },
  PayrollDashboard: {
    path: '/payroll',
    component: <PayrollDashboard />,
  },
  DetailedReport: {
    path: '/reports/detailed',
    component: <DetailedReport />,
  },
};
