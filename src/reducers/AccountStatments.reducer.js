import AccountStatmentsConstants from '../constants/AcountStatments.constants';

const initialState = {
  account_statments: null,
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
    default:
      return { ...state };
  }
};

export default AccountStatmentReducer;
