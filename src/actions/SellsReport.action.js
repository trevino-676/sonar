/* eslint-disable no-use-before-define */
/* eslint-disable no-case-declarations */
// @ts-check
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

const getTopByClients = (rfc, fromDate, toDate) => {
  const FAIL_MESSAGE =
    'Hubo un error en la peticion del top de ventas por clientes';
  const request = () => ({
    type: SellsReportsConstants.GET_TOP_BY_CLIENTS_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_TOP_BY_CLIENTS_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_TOP_BY_CLIENTS_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    const data = await SellReportsService.getTopByClients({
      'datos.Rfc': rfc,
      from_date: fromDate,
      to_date: toDate,
    });
    if (!data) {
      dispatch(fail(FAIL_MESSAGE));
      return;
    }
    dispatch(success(_transformData(data, 'cliente')));
  };
};

const getTopByItems = (rfc, fromDate, toDate) => {
  const FAIL_MESSAGE =
    'Hubo un error en la peticion del reporte de ventas detallado';
  const request = () => ({
    type: SellsReportsConstants.GET_TOP_BY_ITEMS_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_TOP_BY_ITEMS_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_TOP_BY_ITEMS_FAIL,
    payload: { error },
  });

  return async (dispatch) => {
    dispatch(request());
    const data = await SellReportsService.getTopByItems({
      'datos.Rfc': rfc,
      from_date: fromDate,
      to_date: toDate,
    });

    if (!data) {
      dispatch(fail(FAIL_MESSAGE));
      return;
    }
    dispatch(success(_transformData(data, 'articulo')));
  };
};

const getTopByService = (rfc, fromDate, toDate) => {
  const FAIL_MESSAGE =
    'Hubo un error en la peticion del reporte de ventas detallado';
  const request = () => ({
    type: SellsReportsConstants.GET_TOP_BY_SERVICES_REQUEST,
  });
  const success = (data) => ({
    type: SellsReportsConstants.GET_TOP_BY_SERVICES_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: SellsReportsConstants.GET_TOP_BY_SERVICES_FAIL,
    payload: { error },
  });

  return async (dispatch) => {
    dispatch(request());
    const data = await SellReportsService.getTopByService({
      'datos.Rfc': rfc,
      from_date: fromDate,
      to_date: toDate,
    });

    if (!data) {
      dispatch(fail(FAIL_MESSAGE));
      return;
    }

    dispatch(success(_transformData(data, 'servicio')));
  };
};

/** Convert the data to donut expected data depends the type.
 * If doesn't support the type, returns null
 * @param {any[]} data
 * @param {string} type
 * @returns {(any[]|null)}
 */

const _transformData = (data, type) => {
  const titles = [[type, 'Ventas']];
  let info;
  switch (type) {
    case 'cliente':
      info = data.map((item) => [item._id.nombre, item.total]);
      break;
    case 'articulo':
      info = data.map((item) => [item._id.articulo, item.importe]);
      break;
    case 'servicio':
      info = data.map((item) => [item._id.servicio, item.importe]);
      break;
    default:
      return null;
  }
  return [...titles, ...info];
};

const SellsReportsActions = {
  byClients,
  byItems,
  byServices,
  totalSells,
  detailedSells,
  getTopByClients,
  getTopByItems,
  getTopByService,
};

export default SellsReportsActions;
