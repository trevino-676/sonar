import CompaniesConstants from '../constants/Companies.constants';
import CompanyService from '../service/company';
import ModalActions from './modal.action';
import AlertActions from './alert.action.js'; 
import LoginActions from './login.action';

const createCompany = (company, token) => {
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
      const resp = await CompanyService.createCompany(company, token);
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
      dispatch(getCompaniesByUser());
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
      if (e.message.indexOf('401') > 0) {
        dispatch(LoginActions.Logout());
        window.location.reload();
      }
    }
  };
};

const getCompanies = (token, type = null, filters = null) => {
  const request = () => ({ type: CompaniesConstants.GET_COMPANIES_REQUEST });
  const success = (companies) => ({
    type: CompaniesConstants.GET_COMPANIES_REQUEST_SUCCESS,
    payload: companies,
  });
  const fail = (error) => ({
    type: CompaniesConstants.GET_COMPANIES_REQUEST_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await CompanyService.findCompanies(type, filters, token);
      if (resp.status !== 200) {
        dispatch(fail(resp.data.message));
        dispatch(
          ModalActions.Error({
            header: 'Error empresas',
            body: resp.data.message,
          })
        );
        return;
      }

      dispatch(success(resp.data.companies));
    } catch (e) {
      if (e.message.indexOf('401') > 0) {
        dispatch(LoginActions.Logout());
        window.location.reload();
      }
      // console.err(e);
    }
  };
};

const updateCompany = (company, token) => {
  const request = () => ({ type: CompaniesConstants.UPDATE_COMPANY_REQUEST });
  const success = (newCompany) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST,
    payload: newCompany,
  });
  const fail = (error) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST_FAIL,
    payload: { error },
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await CompanyService.updateCompany(company, token);
      if (resp.status !== 200) {
        dispatch(fail(resp.data.message));
        dispatch(
          ModalActions.Error({ title: 'Compania', body: resp.data.message })
        );
      }
      dispatch(success(company));
      dispatch(getCompaniesByUser(token));
      dispatch(
        ModalActions.Success({ title: 'Compania', body: resp.data.message })
      );
    } catch (e) {
      dispatch(fail(e));
      dispatch(ModalActions.Error({ title: 'Compania', body: e }));
      if (e.message.indexOf('401') > 0) {
        dispatch(LoginActions.Logout());
        window.location.reload();
      }
    }
  };
};
const getCompaniesByUser = () => {
  const request = () => ({ type: CompaniesConstants.GET_COMPANIES_REQUEST });
  const success = (companies) => ({
    type: CompaniesConstants.GET_COMPANIES_REQUEST_SUCCESS,
    payload: companies,
  });
  const fail = (error) => ({
    type: CompaniesConstants.GET_COMPANIES_REQUEST_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const companies = await CompanyService.getCompaniesByUser();
      if (!companies) {
        dispatch(fail('Error al obtener las empresas'));
        dispatch(
          ModalActions.Error({
            title: 'Error empresas',
            body: 'Error al obtener las empresas',
          })
        );
        return;
      }
      dispatch(success(companies));
    } catch (e) {
      if (e.message.indexOf('401') > 0) {
        dispatch(LoginActions.Logout());
        window.location.reload();
      }
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
    payload: { error },
  });

  return async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await CompanyService.deleteCompany(id, token);
      if (resp.status !== 200) {
        dispatch(fail(resp.data.message));
        dispatch(
          ModalActions.Error({ title: 'Company', body: resp.data.message })
        );
        return;
      }
      dispatch(success());
      dispatch(getCompaniesByUser());
      dispatch(
        ModalActions.Success({ title: 'Company', body: resp.data.message })
      );
    } catch (e) {
      dispatch(fail(e.message));
      dispatch(ModalActions.Error({ title: 'Company', body: e.message }));
      if (e.message.indexOf('401') > 0) {
        dispatch(LoginActions.Logout());
        window.location.reload();
      }
    }
  };
};

const uploadFile = (company, files) => {
  const request = () => ({ type: CompaniesConstants.UPDATE_COMPANY_REQUEST });
  const success = (updatedCompany) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST_SUCCES,
    payload: updatedCompany,
  });
  const fail = (error) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      files.forEach(async (file) => {
        const resp = await CompanyService.uploadFile(company, file);
        if (!resp) {
          dispatch(fail('Error al guardar el archivo en la empresa'));
          dispatch(
            ModalActions.Error({
              title: 'Error empresa',
              body: 'Error al guardar el archivo en la empresa',
            })
          );
        }
      });
      dispatch(success(company));
      dispatch(getCompaniesByUser());
    } catch (e) {
      dispatch(LoginActions.Logout());
      window.location.reload();
    }
  };
};

const setFielPassword = (company, fieldEncodePassword) => {
  const request = () => ({ type: CompaniesConstants.UPDATE_COMPANY_REQUEST });
  const success = (updatedCompany) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST_SUCCES,
    payload: updatedCompany,
  });
  const fail = (error) => ({
    type: CompaniesConstants.UPDATE_COMPANY_REQUEST_FAIL,
    payload: { error },
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await CompanyService.setFielPassword(
        company,
        fieldEncodePassword
      );
      if (!resp) {
        dispatch(fail('Error al guardar el archivo en la empresa'));
        dispatch(
          ModalActions.Error({
            title: 'Error empresa',
            body: 'Error al guardar el archivo en la empresa',
          })
        );
        return;
      }
      dispatch(success(company));
      dispatch(getCompaniesByUser());
    } catch (e) {
      dispatch(LoginActions.Logout());
      window.location.reload();
    }
  };
};

const createCompanyWizzard = (company) => {
    const token = localStorage.getItem("token");
    const SUCCESS_MESSAGE = 'Se creo correctamente la empresa';
    const FAIL_MESSAGE = 'Hubo un error al momento de crear la empresa';
    const request = () => ({type: CompaniesConstants.ADD_COMPANY_REQUEST});
    const success = () => ({type: CompaniesConstants.ADD_COMPANY_REQUEST_SUCCESS, payload: SUCCESS_MESSAGE});
    const fail = () => ({type: CompaniesConstants.ADD_COMPANY_REQUEST_FAIL, payload: {error: FAIL_MESSAGE}});

    const async (dispatch) => {
        dispatch(AlertActions.clean());
        dispatch(request());
        try {
            const resp = await CompanyService.createCompany(company, token);
            if (resp.status !== 200){
                // TODO: Agregar la alert para error
                dispatch(AlertActions.error(FAIL_MESSAGE));
                return;
            }
            dispatch(AlertActions.success(SUCCESS_MESSAGE));
        } catch(error) {
            if (error.message.indexOf('401')) {
                dispatch(LoginActions.Logout());
                window.location.reload();
            }
        }
    }
}

const CompanyActions = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
  getCompaniesByUser,
  uploadFile,
  setFielPassword,
  createCompanyWizzard,  
};

export default CompanyActions;
