import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../../../actions/config.action';
import useReportTitle from '../../../hooks/useReportTitle';
import SystemConstants from '../../../constants/system.constants';

import '../../../styles/pages/config/scheduler.css';

const RPAScheduler = ({ config }) => {
  useReportTitle(SystemConstants.CONFIGURATION_RPA);
  const dispatch = useDispatch();
  const [rpa, setRPA] = useState(config.rpa);
  const [opinion, setOpinion] = useState(config.opinion);
  const [cfdis, setCfdis] = useState(config.cfdis);
  const onChangeOpinion = (event) => {
    const date = new Date(`${event.target.value}T00:00:00`);
    setRPA(date.getDay());
  };
  const onChange = (event) => {
    const date = new Date(`${event.target.value}T00:00:00`);
    setOpinion(date.getDay());
  };
  const onChangeCfdis = (event) => {
    const date = new Date(`${event.target.value}T00:00:00`);
    setCfdis(date.getDay());
  };
  useEffect(() => {
    setRPA(config.rpa);
    setOpinion(config.opinion);
    setCfdis(config.cfdis);
  }, []);
  useEffect(() => {
    if (rpa !== config.rpa) {
      const data = { ...config, rpa };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
    if (opinion !== config.opinion) {
      const data = { ...config, opinion };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
    if (cfdis !== config.cfdis) {
      const data = { ...config, cfdis };
      dispatch(ConfigActions.updateUSerConfig(data));
    }
  }, [rpa, opinion, cfdis]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <p>Escoge cada cuando consultar EFOS</p>
            <div className="schedule">
              <input type="date" onChange={onChange} />
            </div>
          </div>
          <div className="col">
            <p>Escoge cada cuando descargar la Opinion</p>
            <div className="schedule">
              <input type="date" onChange={onChangeOpinion} />
            </div>
          </div>
          <div className="col">
            <p>Escoge cada cuando descargar CFDIs</p>
            <div className="schedule">
              <input type="date" onChange={onChangeCfdis} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RPAScheduler;
