/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CompanyPage from '../pages/companies';
import NotificationsComponent from '../pages/config/notifications';
import Scheduler from '../pages/config/scheduler';
import DeshboardsConfigComponent from '../pages/config/dashboard';

import '../styles/components/ConfigurationLayout.css';

const ConfigurationLayout = () => {
  const config = useSelector((state) => state.config.config);

  const [hiddenElements, setHiddenElements] = useState({
    companies: false,
    dashboard: true,
    notification: true,
    scheluder: true,
  });

  const _changeActive = (id) => {
    const company = document.getElementById('companies');
    const dashboard = document.getElementById('dashboard');
    const notification = document.getElementById('notification');
    const scheduler = document.getElementById('scheduler');

    switch (id) {
      case 'company':
        company.classList.add('active');
        dashboard.classList.remove('active');
        notification.classList.remove('active');
        scheduler.classList.remove('active');
        break;
      case 'dashboard':
        company.classList.remove('active');
        dashboard.classList.add('active');
        notification.classList.remove('active');
        scheduler.classList.remove('active');
        break;
      case 'notification':
        company.classList.remove('active');
        dashboard.classList.remove('active');
        notification.classList.add('active');
        scheduler.classList.remove('active');
        break;
      case 'scheduler':
        company.classList.remove('active');
        dashboard.classList.remove('active');
        notification.classList.remove('active');
        scheduler.classList.add('active');
        break;
      default:
        break;
    }
  };

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
        _changeActive('company');
        break;
      case 'Dashboard':
        setHiddenElements({
          ...initialElements,
          dashboard: false,
        });
        _changeActive('dashboard');
        break;
      case 'Notificaciones':
        setHiddenElements({
          ...initialElements,
          notification: false,
        });
        _changeActive('notification');
        break;
      case 'Scheduler':
        setHiddenElements({
          ...initialElements,
          scheluder: false,
        });
        _changeActive('scheduler');
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
      <h1 className="title">Configuración</h1>
      <div className="config-group">
        <div className="config-aside item">
          <div
            className="config-aside-item active"
            id="companies"
            onClick={handleClick}
          >
            <span className="text-center">Mis empresas</span>
          </div>
          <div
            className="config-aside-item"
            id="dashboard"
            onClick={handleClick}
          >
            <span className="text-center">Dashboard</span>
          </div>
          <div
            className="config-aside-item"
            onClick={handleClick}
            id="notification"
          >
            <span className="text-center">Notificaciones</span>
          </div>
          <div
            className="config-aside-item"
            onClick={handleClick}
            id="scheduler"
          >
            <span className="text-center">Scheduler</span>
          </div>
        </div>
        <div className="config-main item">
          <div hidden={hiddenElements.companies}>
            <CompanyPage config={config} />
          </div>
          <div hidden={hiddenElements.dashboard}>
            <DeshboardsConfigComponent config={config} />
          </div>
          <div hidden={hiddenElements.notification}>
            <NotificationsComponent config={config} />
          </div>
          <div hidden={hiddenElements.scheluder}>
            <Scheduler config={config} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigurationLayout;
