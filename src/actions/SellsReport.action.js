import SellsReportsConstants from '../constants/SellsReports.constants';
import ModalActions from './modal.action';
import LoginActions from './login.action';
import SellReportsService from '../service/reports/sellsReports';

const byClients = (filters) => {
  const failMessage =
    'Hubo un error en la peticion de la informacion del reporte';
  const request = () => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const data = await SellReportsService.byClients(filters);
      if (!data) {
        dispatch(fail(failMessage));
        dispatch(ModalActions.Error({ title: 'Error', body: failMessage }));
        return;
      }
      dispatch(success(data));
    } catch (err) {
      dispatch(fail(err.message));
      dispatch(LoginActions.Logout());
      window.location.reload();
    }
  };
};

const byItems = (filters) => {
  const failMessage = 'Hubo un error en la peticion del reporte';
  const request = () => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_ITEMS_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_ITEMS_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_ITEMS_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const data = await SellReportsService.byItems(filters);
      if (!data) {
        dispatch(fail(failMessage));
        dispatch(ModalActions.Error({ title: 'Error', body: failMessage }));
        return;
      }
      dispatch(success(data));
    } catch (err) {
      dispatch(fail(err.message));
      dispatch(LoginActions.Logout());
      window.location.reload();
    }
  };
};

const SellsReportsActions = {
  byClients,
  byItems,
};

export default SellsReportsActions;
