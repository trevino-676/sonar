import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../../../actions/config.action';
import useReportTitle from '../../../hooks/useReportTitle';
import SystemConstants from '../../../constants/system.constants';
import GraphicsConstants from '../../../constants/Graphcs.constants';

import '../../../styles/pages/config/scheduler.css';

const HomeConfig = ({ config }) => {
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
    if (graphics !== config.graphics) {
      const data = { ...config, graphics };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
  }, [graphics]);
  return (
    <>
      <div>
        <p>Elige que gráficas se muestren en el Home</p>
      </div>
      <div className="schedule">
        {GraphicsConstants.HOME.map((item) => (
          <label htmlFor={item.name}>
            <input
              type="checkbox"
              name={item.name}
              value={item.value}
              onChange={onChange}
              key={item.name}
            />
            {item.text}
          </label>
        ))}
      </div>
    </>
  );
};

export default HomeConfig;
