import SellsReportsConstants from '../constants/SellsReports.constants';

const SellsReportsReducer = (state, action) => {
  switch (action.type) {
    case SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_REQUEST:
      return { ...state };
    case SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_SUCCESS:
      return { ...state, by_clients: action.payload };
    case SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default SellsReportsReducer;
