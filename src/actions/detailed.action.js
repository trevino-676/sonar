import DetailedReportService from '../service/reports/Detailed.service';
import DetailedReportConstanst from '../constants/Detailed.constants';
import ModalActions from './modal.action';

const FAIL_MESSAGE = 'Hubo un error al obtener los datos del reporte';
// const logout = (dispatch, failAction, errorMessage) => {
//   dispatch(failAction(errorMessage));
//   window.location.reload();
// };
const raiseModalError = (dispatch, failAction) => {
  dispatch(failAction(FAIL_MESSAGE));
  dispatch(ModalActions.Error({ title: 'Error', body: FAIL_MESSAGE }));
};

const getProviderDetailedReport = (companyRfc) => {
  const request = () => ({
    type: DetailedReportConstanst.GET_PROVIDERS_DETAILED_REQUEST,
  });
  const success = (data) => ({
    type: DetailedReportConstanst.GET_PROVIDERS_DETAILED_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: DetailedReportConstanst.GET_PROVIDERS_DETAILED_FAIL,
    payload: { error },
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    const resp = await DetailedReportService.getProviderDetailed(companyRfc);
    if (!resp) {
      raiseModalError(dispatch, fail);
      return;
    }
    dispatch(success(resp));
  };
};

const DetailedReportActions = {
  getProviderDetailedReport,
};

export default DetailedReportActions;
