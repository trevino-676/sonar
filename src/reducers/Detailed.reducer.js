import DetailedReportConstanst from '../constants/Detailed.constants';

const initialState = {
  provider_detailed_report: null,
};

const DetailedReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case DetailedReportConstanst.GET_PROVIDERS_DETAILED_REQUEST:
      return { ...state };
    case DetailedReportConstanst.GET_PROVIDERS_DETAILED_SUCCESS:
      return { ...state, provider_detailed_report: action.payload };
    case DetailedReportConstanst.GET_PROVIDERS_DETAILED_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default DetailedReportReducer;
