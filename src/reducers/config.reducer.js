import ConfigConstants from '../constants/config.constants';

const config = localStorage.getItem('config');
const initialState = config ? { config } : { config: null };

const ConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case ConfigConstants.GET_CONFIG_REQUEST:
      return { ...state };
    case ConfigConstants.GET_CONFIG_SUCCESS:
      return { ...state, config: action.payload };
    case ConfigConstants.GET_CONFIG_FAIL:
      return { ...state, error: ConfigConstants.GET_FAIL_MESSAGE };
    case ConfigConstants.SAVE_CONFIG_REQUEST:
      return { ...state };
    case ConfigConstants.SAVE_CONFIG_SUCCESS:
      return { ...state, new_config: action.payload };
    case ConfigConstants.SAVE_CONFIG_FAIL:
      return { ...state, error: ConfigConstants.SAVE_FAIL_MESSAGE };
    case ConfigConstants.UPDATE_CONFIG_REQUEST:
      return { ...state };
    case ConfigConstants.UPDATE_CONFIG_SUCCESS:
      return { ...state, updated_config: action.payload };
    case ConfigConstants.UPDATE_CONFIG_FAIL:
      return { ...state, error: ConfigConstants.SAVE_FAIL_MESSAGE };
    default:
      return { ...state };
  }
};

export default ConfigReducer;
