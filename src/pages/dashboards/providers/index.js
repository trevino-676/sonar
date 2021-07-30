import React from 'react';

import AmountDisplay from '../../../components/AmountDisplayComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import DonutComponent from '../../../components/DonutComponent';
import useReportTitle from '../../../hooks/useReportTitle';
import routes from './BreadcrumbRoutes';
import EfoList from '../../../components/EfoListComponent';

import '../../../styles/pages/Dashboard.css';

const ProviderDashboard = () => {
  useReportTitle('Sonar | Proveedores');
  const providersData = [
    {
      title: 'Compras por proveedor',
      path: '/providers',
      top: ['Prov. 1', 'Prov. 2', 'Prov. 3', 'Prov. 4'],
      data: [
        ['Proveedores', 'Compras'],
        ['Prov. 1', 200000.0],
        ['Prov. 2', 300000.0],
        ['Prov. 3', 135678.54],
        ['Prov. 4', 16089.99],
      ],
    },
    {
      title: 'Complementos de pago',
      path: '/providers',
      top: ['Verificados', 'Pendientes', 'Faltantes'],
      data: [
        ['Tipo', 'Complementos'],
        ['Verificados', 278],
        ['Pendientes', 100],
        ['Faltantes', 57],
      ],
    },
    {
      title: 'Opinión de cumplimiento',
      path: '/reports/opinion',
      top: ['Positiva', 'Negativa', 'Pendiente'],
      data: [
        ['Tipo', 'Opinion'],
        ['Positiva', 50],
        ['Negativa', 10],
        ['Pendiente', 5],
      ],
    },
  ];
  const efoList = ['Preveedor X', 'Proveedor Y', 'Proveedor Z', 'Proveedor ∫'];

  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <h1 className="title">Proveedores</h1>
      <div className="dashboard-content">
        <AmountDisplay title="Compras del mes" amount="11503.60" route="/" />
        {providersData.map((item) => (
          <DonutComponent
            top={item.top}
            data={item.data}
            route={item.path}
            title={item.title}
            key={item.title}
          />
        ))}
        <EfoList
          title="Proveedores en lista de EFOs"
          efoList={efoList}
          route="/"
        />
      </div>
    </>
  );
};

export default ProviderDashboard;
