import CompaniesConstants from '../constants/Companies.constants';
import CompanyService from '../service/company';
import ModalActions from './modal.action';

const createCompany = (company) => {
  const request = () => ({ type: CompaniesConstants.ADD_COMPANY_REQUEST });
  const success = (companySaved) => ({
    type: CompaniesConstants.ADD_COMPANY_REQUEST_SUCCESS,
    payload: companySaved,
  });
  const fail = (message) => ({
    type: CompaniesConstants.ADD_COMPANY_REQUEST_FAIL,
    payload: { error: message },
  });
  return async (dispatch) => {
    try {
      dispatch(request());
      dispatch(ModalActions.Clean());
      const resp = await CompanyService.createCompany(company);
      if (resp.status !== 200) {
        dispatch(fail(resp.data.message));
        dispatch(
          ModalActions.Error({
            title: 'Error al crear la compania',
            body: resp.data.message,
          })
        );
      }
      dispatch(success(company));
      // eslint-disable-next-line no-use-before-define
      dispatch(getCompanies());
      dispatch(
        ModalActions.Success({
          title: 'Compañia',
          body: 'Se agrego con exito una nueva compañia',
        })
      );
    } catch (e) {
      dispatch(ModalActions.Clean());
      dispatch(fail(e.message));
      dispatch(
        ModalActions.Error({
          title: 'Error al crear la compania',
          body: e.message,
        })
      );
    }
  };
};

const getCompanies = (type, filters) => {
  const request = () => ({ type: CompaniesConstants.GET_COMPANIES_REQUEST });
  const success = (companies) => ({
    type: CompaniesConstants.GET_COMPANIES_REQUEST_SUCCESS,
    payload: companies,
  });
  const fail = (error) => ({
    type: CompaniesConstants.ADD_COMPANY_REQUEST_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await CompanyService.findCompanies(type, filters);
      if (resp.status !== 200) {
        dispatch(fail(resp.data.message));
        dispatch(
          ModalActions.Error({ header: 'Companias', body: resp.data.message })
        );
      }
      dispatch(success(resp.data.companies));
    } catch (e) {
      dispatch(fail(e));
      dispatch(ModalActions.Error({ header: 'Companias', body: e }));
    }
  };
};

const updateCompany = (company) => {
  const request = () => ({ type: CompaniesConstants.UPDATE_COMPANY_REQUEST });
  const success = (newCompany) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST,
    payload: newCompany,
  });
  const fail = (error) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST_FAIL,
    error,
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await CompanyService.updateCompany(company);
      if (resp.status !== 200) {
        dispatch(fail(resp.data.message));
        dispatch(
          ModalActions.Error({ title: 'Compania', body: resp.data.message })
        );
      }
      dispatch(success(company));
      dispatch(getCompanies());
      dispatch(
        ModalActions.Success({ title: 'Compania', body: resp.data.message })
      );
    } catch (e) {
      dispatch(fail(e));
      dispatch(ModalActions.Error({ title: 'Compania', body: e }));
    }
  };
};

const deleteCompany = (id) => {
  const request = () => ({ type: CompaniesConstants.DELETE_COMPANY_REQUEST });
  const success = () => ({
    type: CompaniesConstants.DELETE_COMPANY_REQUEST_SUCCESS,
  });
  const fail = (error) => ({
    type: CompaniesConstants.DELETE_COMPANY_REQUEST_FAIL,
    error,
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await CompanyService.deleteCompany(id);
      if (resp.status !== 200) {
        dispatch(fail(resp.data.message));
        dispatch(
          ModalActions.Error({ title: 'Company', body: resp.data.message })
        );
      }
      dispatch(success());
      dispatch(getCompanies());
      dispatch(
        ModalActions.Success({ title: 'Company', body: resp.data.message })
      );
    } catch (e) {
      dispatch(fail(e));
      dispatch(ModalActions.Error({ title: 'Company', body: e }));
    }
  };
};

const CompanyActions = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
};

export default CompanyActions;