import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConfigActions from '../actions/config.action';

const useConfig = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ConfigActions.getUserConfig());
  }, []);
};

export default useConfig;
