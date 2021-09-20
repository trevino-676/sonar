import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../../../actions/config.action';
import useReportTitle from '../../../hooks/useReportTitle';
import SystemConstants from '../../../constants/system.constants';
import GraphicsConstants from '../../../constants/Graphcs.constants';

import '../../../styles/pages/config/scheduler.css';

const ClientsConfig = ({ config }) => {
  useReportTitle(SystemConstants.CONFIGURATION_DASHBOARDS);
  const dispatch = useDispatch();
  const [graphics, setGraphics] = useState(config.graphics);
  const onChange = (event) => {
    let config = Object.assign({}, graphics);
    config[event.target.value] = event.target.checked;
    setGraphics(config);
  }

  useEffect(() => {
    setGraphics(config.graphics);
  }, []);

  useEffect(() => {
    setGraphics(config.graphics);
  }, [config.graphics]);

  useEffect(() => {
    if (graphics !== config.graphics) {
      const data = { ...config, graphics };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
  }, [graphics]);
  return (
    <>
      <div>
        <p>Elige que gráficas se muestren en Clientes</p>
      </div>
      <div className="schedule">
        {GraphicsConstants.CLIENTS.map((item) => (
          <label htmlFor={item.name}>
            <input
              type="checkbox"
              name={item.name}
              value={item.value}
              onChange={onChange}
              key={item.name}
              checked={config.graphics[item.name]}
            />
            {item.text}
          </label>
        ))}
      </div>
    </>
  );
};

export default ClientsConfig;
