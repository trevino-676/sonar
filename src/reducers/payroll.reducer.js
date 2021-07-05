import PayrollConstants from '../constants/PayrollReports.constants';

const initState = {
  taxable_perceptions: null,
};

const PayrollReportsReducer = (state = initState, action) => {
  switch (action.type) {
    case PayrollConstants.TAXABLE_PERCEPTIONS_REPORT_REQUEST:
      return { ...state };
    case PayrollConstants.TAXABLE_PERCEPTIONS_REPORT_SUCCESS:
      return { ...state, taxable_perceptions: action.payload };
    case PayrollConstants.TAXABLE_PERCEPTIONS_REPORT_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default PayrollReportsReducer;
