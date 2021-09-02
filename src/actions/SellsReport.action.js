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

const byServices = (filters) => {
  const failMessage =
    'Hubo un error en la peticion del reporte de ventas por servicio';
  const request = () => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_SERVICES_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_SERVICES_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_SELL_REPORT_BY_SERVICES_FAIL,
    payload: { error },
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const data = await SellReportsService.byServices(filters);
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

const totalSells = (companyRfc, fromDate, toDate) => {
  const failMessage = 'Hubo un error en la peticion del total de ventas';
  const request = () => ({
    type: SellsReportsConstants.GET_TOTAL_SELLS_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_TOTAL_SELLS_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_TOTAL_SELLS_FAIL,
    payload: { error },
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const data = await SellReportsService.totalSells(
        companyRfc,
        fromDate,
        toDate
      );
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

const detailedSells = (companyRfc, fromDate, toDate) => {
  const FAIL_MESSAGE =
    'Hubo un error en la peticion del reporte de ventas detallado';
  const request = () => ({
    type: SellsReportsConstants.GET_DETAILED_SELLS_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_DETAILED_SELLS_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_DETAILED_SELLS_FAIL,
    payload: { error },
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const data = await SellReportsService.detailedSells(
        companyRfc,
        fromDate,
        toDate
      );
      if (!data) {
        dispatch(fail(FAIL_MESSAGE));
        dispatch(ModalActions.Error({ title: 'Error', body: FAIL_MESSAGE }));
      }
      dispatch(success(data));
    } catch (err) {
      dispatch(fail(FAIL_MESSAGE));
      dispatch(ModalActions.Error({ title: 'Error', body: FAIL_MESSAGE }));
    }
  };
};

const SellsReportsActions = {
  byClients,
  byItems,
  byServices,
  totalSells,
  detailedSells,
};

export default SellsReportsActions;
