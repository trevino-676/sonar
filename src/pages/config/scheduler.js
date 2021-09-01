import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../../actions/config.action';

import '../../styles/pages/config/scheduler.css';

const SchedulerComponent = ({ config }) => {
  const dispatch = useDispatch();
  const currentPeriod = config.period;
  const [period, setPeriod] = useState(currentPeriod);
  const onChange = (event) => {
    setPeriod(event.target.value);
  };
  useEffect(() => {
    if (period !== currentPeriod) {
      const data = { ...config, period };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
  }, [period]);
  return (
    <>
      <div>
        <p>Escoge el rango de fechas que se mostraran en los dashboards</p>
      </div>
      <div className="schedule">
        <label htmlFor="fortnightly">
          <input
            type="radio"
            value="fortnightly"
            name="fortnightly"
            checked={period === 'fortnightly'}
            onChange={onChange}
          />
          Quincenalmente
        </label>
        <label htmlFor="monthly">
          <input
            type="radio"
            value="monthly"
            name="monthly"
            checked={period === 'monthly'}
            onChange={onChange}
          />
          Mensualmente
        </label>
        <label htmlFor="quarterly">
          <input
            type="radio"
            value="quarterly"
            name="quarterly"
            checked={period === 'quarterly'}
            onChange={onChange}
          />
          Trimestralmente
        </label>
        <label htmlFor="biannual">
          <input
            type="radio"
            value="biannual"
            name="biannual"
            checked={period === 'biannual'}
            onChange={onChange}
          />
          Semestralmente
        </label>
      </div>
    </>
  );
};

export default SchedulerComponent;