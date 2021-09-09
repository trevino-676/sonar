import DetailedReportConstanst from '../constants/Detailed.constants';

const initialState = {
  provider_detailed_report: null,
  total_detailed_report: null
};

const DetailedReportReducer = (state = initialState, action) => {
  switch (action.type) {
    /// PROVIDERS
    case DetailedReportConstanst.GET_PROVIDERS_DETAILED_REQUEST:
      return { ...state };
    case DetailedReportConstanst.GET_PROVIDERS_DETAILED_SUCCESS:
      return { ...state, provider_detailed_report: action.payload };
    case DetailedReportConstanst.GET_PROVIDERS_DETAILED_FAIL:
      return { ...state, error: action.payload.error };
    /// ALL (CLIENTS AND PROVIDERS)
    case DetailedReportConstanst.GET_TOTAL_DETAILED_REQUEST:
      return { ...state };
    case DetailedReportConstanst.GET_TOTAL_DETAILED_SUCCESS:
      return { ...state, total_detailed_report: action.payload };
    case DetailedReportConstanst.GET_TOTAL_DETAILED_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default DetailedReportReducer;
