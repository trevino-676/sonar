import React from 'react';
import { Link } from 'react-router-dom';
import { Chart } from 'react-google-charts';

import '../styles/components/DonutComponent.css';

const DonutComponent = ({ top, data, title, route }) => (
  <div className="donut-component">
    <div className="donut-title">
      <h4>{title}</h4>
    </div>
    <div className="donut-top">
      {top.map((item) => (
        <span>{item}</span>
      ))}
    </div>
    <div className="donut-graph" id="donut-chart">
      <Chart
        width="21rem"
        height="15.18rem"
        chartType="PieChart"
        loader={<div>Cargando</div>}
        data={data}
        options={{ pieHole: 0.4 }}
      />
    </div>
    <div className="donut-detail">
      <Link to={route}>Ver detalles</Link>
    </div>
  </div>
);

export default DonutComponent;
