import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/EfoList.css';

const EfoList = ({ title, efoList, route }) => (
  <div className="efo-component">
    <div className="efo-title">
      <h4>{title}</h4>
    </div>
    <div className="efo-list">
      {efoList.map((item) => (
        <div>
          <span>{item}</span>
        </div>
      ))}
    </div>
    <div className="efo-footer">
      <Link to={route}>Ver detalles</Link>
    </div>
  </div>
);

export default EfoList;
