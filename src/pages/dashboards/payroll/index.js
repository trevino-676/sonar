import React from 'react';

import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import AmountDisplayComponent from '../../../components/AmountDisplayComponent';
import useReportTitle from '../../../hooks/useReportTitle';
import routes from './BreadcrumbRoutes';

import '../../../styles/pages/Dashboard.css';

const PayrollDashboard = () => {
  useReportTitle('Sonar | Nómina');
  const data = [
    {
      title: 'Retenciones de nómina',
      amount: 346345.35,
      path: '/reports/retentions',
    },
    {
      title: 'Percepciones grabadas',
      amount: 178658.58,
      path: '/reports/payroll/taxables_perceptions',
    },
  ];

  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <h1 className="title">Nómina</h1>
      <div className="dashboard-content">
        {data.map((item) => (
          <AmountDisplayComponent
            title={item.title}
            amount={item.amount}
            route={item.path}
            key={item.title}
          />
        ))}
      </div>
    </>
  );
};

export default PayrollDashboard;
