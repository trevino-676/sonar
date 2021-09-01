import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../../../actions/config.action';
import useReportTitle from '../../../hooks/useReportTitle';
import SystemConstants from '../../../constants/system.constants';
import ConfigConstants from '../../../constants/config.constants';

import '../../../styles/pages/config/scheduler.css';

const ReminderScheduler = ({ config }) => {
  useReportTitle(SystemConstants.CONFIGURATION_REMINDERS);
  const dispatch = useDispatch();
  const [reminder, setReminder] = useState(config.reminder);
  const onChange = (event) => setReminder(event.target.value);
  useEffect(() => {
    setReminder(config.reminder);
  }, []);
  useEffect(() => {
    if (reminder !== config.reminder) {
      const data = { ...config, reminder };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
  }, [reminder]);
  return (
    <>
      <div>
        <p>Escoge cada cuando quieres recibir los recordatorios</p>
      </div>
      <div className="schedule">
        {ConfigConstants.REMINDERS_SCHEDULER.map((item) => (
          <label htmlFor={item.name}>
            <input
              type="radio"
              value={item.value}
              name={item.name}
              checked={reminder === item.value}
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

export default ReminderScheduler;
