import React from 'react';

import DonutComponent from '../components/DonutComponent';

const Home = () => {
  const title = 'Ventas por cliente';
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
      <DonutComponent
        top={top}
        data={data}
        title={title}
        route="/reports/sells/by_client"
      />
    </>
  );
};

export default Home;
