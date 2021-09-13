/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../../actions/config.action';
import useReportTitle from '../../hooks/useReportTitle';
import SystemConstants from '../../constants/system.constants';
import ConfigConstants from '../../constants/config.constants';
import AlertActions from '../../actions/alert.action';

import '../../styles/pages/config/notifications.css';

const NotificationsComponent = ({ config }) => {
  useReportTitle(SystemConstants.CONFIGURATION_NOTIFICATION);
  const configNotifications =
    'main_company' in config ? config.notifications : [];
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState(configNotifications);
  const onChange = (event) => {
    if (event.target.checked) {
      setNotifications([...notifications, event.target.value]);
    } else {
      setNotifications(
        notifications.filter((value) => value !== event.target.value)
      );
    }
  };
  useEffect(() => {
    setNotifications(configNotifications);
  }, [config.notifications]);

  useEffect(() => {
    if (configNotifications.length !== notifications.length) {
      const data = { ...config, notifications };
      dispatch(ConfigActions.updateUSerConfig(data));
      dispatch(
        AlertActions.success('Se guardo la configuracion correctamente')
      );
    }
  }, [notifications]);
  return (
    <>
      <div>
        <p>Escoge las notificaciones que deseas recibir</p>
      </div>
      <div className="notifications">
        {ConfigConstants.NOTIFICATIONS.map((item, idx) => (
          <label htmlFor={item.name}>
            <input
              type="checkbox"
              name={item.name}
              value={item.value}
              onChange={onChange}
              key={idx}
              checked={notifications.indexOf(item.value) > -1}
            />
            {item.text}
          </label>
        ))}
      </div>
    </>
  );
};

export default NotificationsComponent;
