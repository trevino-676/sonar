import CompaniesConstants from '../constants/Companies.constants';

const initialState = {
  companies: [],
};

const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CompaniesConstants.ADD_COMPANY_REQUEST:
      return { ...state };
    case CompaniesConstants.ADD_COMPANY_REQUEST_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        address: action.payload.address,
        rfc: action.payload.rfc,
        users: action.payload.users,
      };
    case CompaniesConstants.ADD_COMPANY_REQUEST_FAIL:
      return { ...state, error: action.payload.error };
    case CompaniesConstants.GET_COMPANIES_REQUEST:
      return { ...state };
    case CompaniesConstants.GET_COMPANIES_REQUEST_SUCCESS:
      return { ...state, companies: action.payload };
    case CompaniesConstants.GET_COMPANIES_REQUEST_FAIL:
      return { ...state, error: action.payload.error, companies: [] };
    case CompaniesConstants.UPDATE_COMPANY_REQUEST:
      return { ...state };
    case CompaniesConstants.UPDATE_COMPANY_REQUEST_SUCCES:
      return {
        ...state,
        name: action.payload.name,
        address: action.payload.address,
        rfc: action.payload.rfc,
        users: action.payload.users,
      };
    case CompaniesConstants.UPDATE_COMPANY_REQUEST_FAIL:
      return { ...state, error: action.payload.error };
    case CompaniesConstants.DELETE_COMPANY_REQUEST:
      return { ...state };
    case CompaniesConstants.DELETE_COMPANY_REQUEST_SUCCESS:
      return { ...state, name: '', address: '', rfc: '', users: [] };
    case CompaniesConstants.DELETE_COMPANY_REQUEST_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default CompanyReducer;
