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
  const [opinion, setOpinion] = useState(config.opinion);
  const [cfdis, setCfdis] = useState(config.cfdis);
  const onChange = (event) => {

    console.log(event.target.value)
    if (event.target.checked) {
      setRPA([...rpa, event.target.value]);
    } else {
      setRPA(
        rpa.filter((value) => value !== event.target.value)
      );
    }
  };
  const onChangeOpinion = (event) => {
    console.log(event.target.value)
    if (event.target.checked) {
      setOpinion([...opinion, event.target.value]);
    } else {
      setOpinion(
        opinion.filter((value) => value !== event.target.value)
      );
    }
  };
  const onChangeCfdis = (event) => {
    console.log(event.target.value)
    if (event.target.checked) {
      setCfdis([...cfdis, event.target.value]);
    } else {
      setCfdis(
        cfdis.filter((value) => value !== event.target.value)
      );
    }
  };
  useEffect(() => {
    setRPA(config.rpa);
    setOpinion(config.opinion);
    setCfdis(config.cfdis);
  }, [config]);
  useEffect(() => {
    if (rpa.length !== config.rpa.length) {
      const data = { ...config, rpa };
      dispatch(ConfigActions.updateUSerConfig(data));
      return;
    }
    if (opinion.length !== config.opinion.length) {
      const data = { ...config, opinion };
      console.log(data)
      dispatch(ConfigActions.updateUSerConfig(data));
      return;
    }
    if (cfdis.length !== config.cfdis.length) {
      const data = { ...config, cfdis };
      dispatch(ConfigActions.updateUSerConfig(data));
      return;
    }
  }, [rpa, opinion, cfdis]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <p>Elige cuando consultar EFOS</p>
            <div className="schedule">
              {ConfigConstants.RPAS_SCHEDULER.map((item,idx) => (
                <label htmlFor={item.name}>
              <input type="checkbox"
              value={item.value}
              name={item.name}
              onChange={onChange}
              key={idx}
              checked={rpa.indexOf(item.value) > -1}
              />
              {item.text}
              </label>
              ))}
            </div>
          </div>
          <div className="col">
            <p>Elige cuando descargar la Opinion de Cumplimiento</p>
            <div className="schedule">
            {ConfigConstants.RPAS_SCHEDULER.map((item,idx) => (
                <label htmlFor={item.name}>
              <input type="checkbox"
              value={item.value}
              name={item.name}
              onChange={onChangeOpinion}
              key={idx}
              checked={opinion.indexOf(item.value) > -1}
              />
              {item.text}
              </label>
              ))}
            </div>
          </div>
          <div className="col">
            <p>Elige cuando descargar CFDIs</p>
            <div className="schedule">
            {ConfigConstants.RPAS_SCHEDULER.map((item,idx) => (
                <label htmlFor={item.name}>
              <input type="checkbox"
              value={item.value}
              name={item.name}
              onChange={onChangeCfdis}
              key={idx}
              checked={cfdis.indexOf(item.value) > -1}
              />
              {item.text}
              </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RPAScheduler;
