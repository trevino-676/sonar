import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../../../actions/config.action';
import useReportTitle from '../../../hooks/useReportTitle';
import SystemConstants from '../../../constants/system.constants';
import ConfigConstants from '../../../constants/config.constants';

import '../../../styles/pages/config/scheduler.css';

const RPAScheduler = ({ config }) => {
  useReportTitle(SystemConstants.CONFIGURATION_RPA);
  const dispatch = useDispatch();
  const [rpa, setRPA] = useState(config.rpa);
  const onChange = (event) => setRPA(event.target.value);
  useEffect(() => {
    setRPA(config.rpa);
  }, []);
  useEffect(() => {
    if (rpa !== config.rpa) {
      const data = { ...config, rpa };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
  }, [rpa]);
  return (
    <>
      <div>
        <p>Escoge cada cuando quieres descargar la informacion</p>
      </div>
      <div className="schedule">
        {ConfigConstants.RPAS_SCHEDULER.map((item) => (
          <label htmlFor={item.name}>
            <input
              type="radio"
              value={item.value}
              name={item.name}
              checked={rpa === item.value}
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

export default RPAScheduler;
