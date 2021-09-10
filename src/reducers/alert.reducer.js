import AlertConstants from '../constants/alert.constants';

const initialState = {
  show: false,
  content: null,
  variant: null,
};

const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case AlertConstants.CLEAN:
      return {
        ...state,
        show: false,
        content: null,
        variant: null,
      };
    case AlertConstants.ERROR:
      return {
        ...state,
        show: true,
        content: action.payload.content,
        variant: 'danger',
      };
    case AlertConstants.WARNING:
      return {
        ...state,
        show: true,
        content: action.payload.content,
        variant: 'warning',
      };
    case AlertConstants.SUCCESS:
      return {
        ...state,
        show: true,
        content: action.payload.content,
        variant: 'success',
      };
    default:
      return { ...state };
  }
};

export default AlertReducer;
