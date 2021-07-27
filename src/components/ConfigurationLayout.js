/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import CompanyPage from '../pages/companies';

import '../styles/components/ConfigurationLayout.css';

const ConfigurationLayout = () => {
  const [hiddenElements, setHiddenElements] = useState({
    companies: false,
    dashboard: true,
    notification: true,
    scheluder: true,
  });

  const handleClick = (event) => {
    const initialElements = {
      companies: true,
      dashboard: true,
      notification: true,
      scheluder: true,
    };
    switch (event.target.innerText) {
      case 'Mis empresas':
        setHiddenElements({
          ...initialElements,
          companies: false,
        });
        break;
      case 'Dashboard':
        setHiddenElements({
          ...initialElements,
          dashboard: false,
        });
        break;
      default:
        setHiddenElements({
          ...hiddenElements,
        });
        break;
    }
  };

  return (
    <>
      <h1>Configuración</h1>
      <div className="config-group">
        <div className="config-aside item">
          <div className="config-aside-item" onClick={handleClick}>
            <span className="text-center">Mis empresas</span>
          </div>
          <div className="config-aside-item" onClick={handleClick}>
            <span className="text-center">Dashboard</span>
          </div>
          <div className="config-aside-item" onClick={handleClick}>
            <span className="text-center">Notificaciones</span>
          </div>
          <div className="config-aside-item" onClick={handleClick}>
            <span className="text-center">Scheduler</span>
          </div>
        </div>
        <div className="config-main item">
          <div hidden={hiddenElements.companies}>
            <CompanyPage />
          </div>
          <div hidden={hiddenElements.dashboard}>
            <h1>dashboard</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigurationLayout;
