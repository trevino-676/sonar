import RetentionConstants from '../constants/Retention.constants';

const initialState = {
  retention_report: null,
};

const RetentionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RetentionConstants.RETENTION_COMPONENT_REQUEST:
      return { ...state };
    case RetentionConstants.RETENTION_COMPONENT_SUCCESS:
      return { ...state, retention_report: action.payload };
    case RetentionConstants.RETENTION_COMPONENT_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default RetentionsReducer;
