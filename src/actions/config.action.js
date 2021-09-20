import ConfigService from '../service/config.service';
import ConfigConstants from '../constants/config.constants';
import ModalActions from './modal.action';
import LoginActions from './login.action';

const raiseModalError = (dispatch, failAction, failMessage) => {
  dispatch(failAction());
  dispatch(ModalActions.Error({ title: 'Error', body: failMessage }));
};

const logout = (dispatch, failAction, failMessage) => {
  dispatch(failAction(failAction(failMessage)));
  dispatch(LoginActions.Logout());
  window.location.reload();
};

const LOGOUT_MESSAGE = 'Token invalido';

const getUserConfig = () => {
  const request = () => ({ type: ConfigConstants.GET_CONFIG_REQUEST });
  const success = (config) => ({
    type: ConfigConstants.GET_CONFIG_SUCCESS,
    payload: config,
  });
  const fail = () => ({ type: ConfigConstants.GET_CONFIG_FAIL });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    const config = await ConfigService.getUserConfig();

    if (!config) {
      raiseModalError(dispatch, fail, ConfigConstants.GET_FAIL_MESSAGE);
      return;
    }
    if (config === 401) {
      logout(dispatch, fail, LOGOUT_MESSAGE);
      return;
    }
    localStorage.setItem('config', JSON.stringify(config));
    dispatch(success(config));
  };
};

const saveUserConfig = (config) => {
  const request = () => ({ type: ConfigConstants.SAVE_CONFIG_REQUEST });
  const success = (data) => ({
    type: ConfigConstants.SAVE_CONFIG_SUCCESS,
    payload: data,
  });
  const fail = () => ({ type: ConfigConstants.SAVE_CONFIG_FAIL });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    const resp = await ConfigService.saveUserConfig(config);
    if (!resp) {
      raiseModalError(dispatch, fail, ConfigConstants.SAVE_FAIL_MESSAGE);
      return;
    }
    if (resp === 401) {
      logout(dispatch, fail, LOGOUT_MESSAGE);
      return;
    }
    dispatch(success(config));
    dispatch(
      ModalActions.Success({
        title: 'Configuracion guardada',
        body: 'La configuracion se guardo correctamente',
      })
    );
    dispatch(getUserConfig());
  };
};

const updateUSerConfig = (config) => {
  const request = () => ({ type: ConfigConstants.UPDATE_CONFIG_REQUEST });
  const success = (data) => ({
    type: ConfigConstants.UPDATE_CONFIG_SUCCESS,
    payload: data,
  });
  const fail = () => ({ type: ConfigConstants.UPDATE_CONFIG_FAIL });
  return async (dispatch) => {
    dispatch(request());
    // dispatch(ModalActions.Clean());
    const resp = await ConfigService.updateUserConfig(config);
    if (!resp) {
      raiseModalError(dispatch, fail, ConfigConstants.SAVE_FAIL_MESSAGE);
      return;
    }
    if (resp === 401) {
      logout(dispatch, fail, LOGOUT_MESSAGE);
      return;
    }
    dispatch(success(config));
    // dispatch(
    //   ModalActions.Success({
    //     title: 'Configuracion guardada',
    //     body: 'La configuracion se guardo correctamente',
    //   })
    // );
    // cdispatch(getUserConfig());
  };
};

const ConfigActions = {
  getUserConfig,
  saveUserConfig,
  updateUSerConfig,
};

export default ConfigActions;
