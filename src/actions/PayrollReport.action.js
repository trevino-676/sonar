import PayrollReportService from '../service/reports/Payroll';
import PayrollConstants from '../constants/PayrollReports.constants';
import ModalActions from './modal.action';
import LoginActions from './login.action';

const FailMessage = 'Hubo un error al obtener los datos del reporte';

const taxablesPerceptions = (filters) => {
  const request = () => ({
    type: PayrollConstants.TAXABLE_PERCEPTIONS_REPORT_REQUEST,
  });
  const success = (data) => ({
    type: PayrollConstants.TAXABLE_PERCEPTIONS_REPORT_SUCCESS,
    payload: data,
  });
  const fail = (error) => ({
    type: PayrollConstants.TAXABLE_PERCEPTIONS_REPORT_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = PayrollReportService.taxablePerceptions(filters);

      if (!resp) {
        dispatch(fail(FailMessage));
        dispatch(ModalActions.Error({ title: 'Error', body: FailMessage }));
        return;
      }
      dispatch(success(resp));
    } catch (err) {
      dispatch(fail(err.message));
      dispatch(LoginActions.Logout());
      window.location.reload();
    }
  };
};

const PayrollReportAction = {
  taxablesPerceptions,
};

export default PayrollReportAction;
