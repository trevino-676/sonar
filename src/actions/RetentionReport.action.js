import RetentionsService from '../service/reports/RetentionReport.service';
import RetentionConstants from '../constants/Retention.constants';
import ModalActions from './modal.action';
import LoginActions from './login.action';

const FailMessage = 'Hubo un error al obtener los datos del reporte';
const logout = (dispatch, failAction, errorMessage) => {
  dispatch(failAction(errorMessage));
  dispatch(LoginActions.Logout());
  window.location.reload();
};
const raiseModalError = (dispatch, failAction) => {
  dispatch(failAction(FailMessage));
  dispatch(ModalActions.Error({ title: 'Error', body: FailMessage }));
};

const retentionReport = (filters) => {
  const request = () => ({
    type: RetentionConstants.RETENTION_COMPONENT_REQUEST,
  });
  const success = (data) => ({
    type: RetentionConstants.RETENTION_COMPONENT_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: RetentionConstants.RETENTION_COMPONENT_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await RetentionsService.retentionReport(filters);
      if (!resp) {
        raiseModalError(dispatch, fail);
        return;
      }
      dispatch(success(resp));
    } catch (err) {
      logout(dispatch, fail, err);
    }
  };
};

const RetentionsActions = {
  retentionReport,
};

export default RetentionsActions;
