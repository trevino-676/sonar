import CuentasConstants from '../constants/Cuentas.constants'

const initialState = {
  accounts: [],
  newAccount: {},
};

const AccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CuentasConstants.ADD_CUENTAS_REQUEST:
      return { ...state };
    case CuentasConstants.ADD_CUENTAS_REQUEST_SUCCESS:
      return {
        ...state,
        newAccount: action.payload,
      };
    case CuentasConstants.ADD_CUENTAS_REQUEST_FAIL:
      return { ...state, error: action.payload.error };
    case CuentasConstants.GET_CUENTAS_REQUEST:
      return { ...state };
    case CuentasConstants.GET_CUENTAS_REQUEST_SUCCESS:
      return { ...state, accounts: action.payload };
    case CuentasConstants.GET_CUENTAS_REQUEST_FAIL:
      return { ...state, error: action.payload.error, accounts: [] };
    case CuentasConstants.UPDATE_CUENTAS_REQUEST:
      return { ...state };
    case CuentasConstants.UPDATE_CUENTAS_REQUEST_SUCCES:
      return {
        ...state,
        name: action.payload.name,
        bank: action.payload.bank,
        account: action.payoad.account,
      };
    case CuentasConstants.UPDATE_CUENTAS_REQUEST_FAIL:
      return { ...state, error: action.payload.error };
    case CuentasConstants.DELETE_CUENTAS_REQUEST:
      return { ...state };
    case CuentasConstants.DELETE_CUENTAS_REQUEST_SUCCESS:
      return { ...state, name: '', address: '', rfc: '', users: [] };
    case CuentasConstants.DELETE_CUENTAS_REQUEST_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default AccountsReducer;
