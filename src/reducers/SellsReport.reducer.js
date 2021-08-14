import SellsReportsConstants from '../constants/SellsReports.constants';

const initState = {
  by_clients: null,
  by_items: null,
  by_services: null,
  total_sells: null,
};

const SellsReportsReducer = (state = initState, action) => {
  switch (action.type) {
    case SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_REQUEST:
      return { ...state };
    case SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_SUCCESS:
      return { ...state, by_clients: action.payload };
    case SellsReportsConstants.GET_SELL_REPORT_BY_CLIENT_FAIL:
      return { ...state, error: action.payload.error };
    case SellsReportsConstants.GET_SELL_REPORT_BY_ITEMS_REQUEST:
      return { ...state };
    case SellsReportsConstants.GET_SELL_REPORT_BY_ITEMS_SUCCESS:
      return { ...state, by_items: action.payload };
    case SellsReportsConstants.GET_SELL_REPORT_BY_ITEMS_FAIL:
      return { ...state, error: action.payload.error };
    case SellsReportsConstants.GET_SELL_REPORT_BY_SERVICES_REQUEST:
      return { ...state };
    case SellsReportsConstants.GET_SELL_REPORT_BY_SERVICES_SUCCESS:
      return { ...state, by_services: action.payload };
    case SellsReportsConstants.GET_SELL_REPORT_BY_SERVICES_FAIL:
      return { ...state, error: action.payload.error };
    case SellsReportsConstants.GET_TOTAL_SELLS_REQUEST:
      return { ...state };
    case SellsReportsConstants.GET_TOTAL_SELLS_SUCCESS:
      return { ...state, total_sells: action.payload };
    case SellsReportsConstants.GET_TOTAL_SELLS_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default SellsReportsReducer;
