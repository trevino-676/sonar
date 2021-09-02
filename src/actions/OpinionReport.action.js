import OpinionReportService from '../service/reports/OpinionReport.service';
import OpinionConstants from '../constants/Opinion.constants';
import ModalActions from './modal.action';
import LoginActions from './login.action';

const FailMessage = 'Hubo un error al obtener los datos del reporte';

const opinionReport = (filters) => {
  const request = () => ({
    type: OpinionConstants.OPINION_COMPONENT_REQUEST,
  });
  const success = (data) => ({
    type: OpinionConstants.OPINION_COMPONENT_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: OpinionConstants.OPINION_COMPONENT_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await OpinionReportService.retentionReport(filters);

      if (!resp) {
        dispatch(fail(FailMessage));
        dispatch(ModalActions.Error({ title: 'Error', body: FailMessage }));
        return;
      }
      dispatch(success(resp));
    } catch (err) {
      if (err.message.indexOf('401') > 0) {
        dispatch(fail(err.message));
        dispatch(LoginActions.Logout());
        window.location.reload();
      }
    }
  };
};

const OpinionActions = {
  opinionReport,
};

export default OpinionActions;
