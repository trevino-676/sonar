import AccountStatmentsConstants from '../constants/AcountStatments.constants';

const initialState = {
  account_movements: null,
  daily_amounts_movements: null,
  upload_statments: false,
  error: null,
};

const AccountStatmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountStatmentsConstants.UPLOAD_ACCCOUNT_STATMENTS_REQUEST:
      return { ...state };
    case AccountStatmentsConstants.UPLOAD_ACCCOUNT_STATMENTS_SUCCESS:
      return {
        ...state,
        upload_statments:
          AccountStatmentsConstants.UPLOAD_ACCOUNT_STATMENT_SUCCESS_MESSAGE,
      };
    case AccountStatmentsConstants.UPLOAD_ACCCOUNT_STATMENTS_FAIL:
      return { ...state, error: action.payload.error };
    case AccountStatmentsConstants.GET_MOVEMENTS_REQUEST:
      return { ...state };
    case AccountStatmentsConstants.GET_MOVEMENTS_SUCCESS:
      return { ...state, account_movements: action.payload };
    case AccountStatmentsConstants.GET_MOVEMENTS_FAIL:
      return { ...state, error: action.payload.error };
    case AccountStatmentsConstants.GET_DAILY_ACCOUNT_MOVEMENTS_REQUEST:
      return { ...state };
    case AccountStatmentsConstants.GET_DAILY_ACCOUNT_MOVEMENTS_SUCCESS:
      return { ...state, daily_amounts_movements: action.payload };
    case AccountStatmentsConstants.GET_DAILY_ACCOUNT_MOVEMENTS_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default AccountStatmentReducer;
