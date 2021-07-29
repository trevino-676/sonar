import React from 'react';

import DonutComponent from '../../../components/DonutComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import routes from './BreadcrumbRoutes';

import '../../../styles/pages/ClientDashboard.css';

const ClientDashboard = () => {
  // TODO: Mover los titulos, top y data a archivos independientes.
  const titles = [
    {
      title: 'Ventas por cliente',
      route: '/reports/sells/by_client',
    },
    {
      title: 'Ventas por producto',
      route: '/reports/sells/by_items',
    },
    {
      title: 'Ventas por servicios',
      route: '/reports/sells/by_services',
    },
  ];
  const top = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4'];
  const data = [
    ['Clientes', 'Ventas'],
    ['Cliente 1', 200000.0],
    ['Cliente 2', 100000.0],
    ['Cliente 3', 50000.0],
    ['Cliente 4', 150000.0],
  ];

  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <h1 className="title">Clientes</h1>
      <div className="dashboard-content">
        {titles.map((title) => (
          <DonutComponent
            top={top}
            data={data}
            title={title.title}
            route={title.route}
          />
        ))}
      </div>
    </>
  );
};

export default ClientDashboard;
