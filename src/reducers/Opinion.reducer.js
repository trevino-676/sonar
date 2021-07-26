import OpinionConstants from '../constants/Opinion.constants';

const initState = {
  taxable_perceptions: null,
};

const OpinionReportReducer = (state = initState, action) => {
  switch (action.type) {
    case OpinionConstants.OPINION_COMPONENT_REQUEST:
      return { ...state };
    case OpinionConstants.OPINION_COMPONENT_SUCCESS:
      return { ...state, opinion_report: action.payload };
    case OpinionConstants.OPINION_COMPONENT_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default OpinionReportReducer;
