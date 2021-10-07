import uploadAccountStatmentsService from '../service/account_statments/upload_account_service';
import AccountStatmentsConstants from '../constants/AcountStatments.constants';
import ModalActions from './modal.action';
import LoginActions from './login.action';

const raiseModalError = (dispatch, action, message) => {
  dispatch(action());
  dispatch(
    ModalActions.Error({
      title: 'Error',
      body: message,
    })
  );
};

const logout = (dispatch, message) => {
  dispatch(ModalActions.Error({ title: 'Error', body: message }));
  dispatch(LoginActions.Logout());
  window.location.reload();
};

const LOGOUT_MESSAGE = 'Token invalido';

const UploadAccountStatment = (bank, file) => {
  const request = () => ({
    type: AccountStatmentsConstants.UPLOAD_ACCCOUNT_STATMENTS_REQUEST,
  });
  const success = () => ({
    type: AccountStatmentsConstants.UPLOAD_ACCCOUNT_STATMENTS_SUCCESS,
  });
  const fail = () => ({
    type: AccountStatmentsConstants.UPLOAD_ACCCOUNT_STATMENTS_FAIL,
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    try {
      const resp = await uploadAccountStatmentsService.uploadAccountStatments(
        bank,
        file
      );
      if (!resp) {
        raiseModalError(
          dispatch,
          fail,
          'Hubo un error al cargar la informacion'
        );
        return;
      }
      dispatch(success());
      dispatch(
        ModalActions.Success({
          title: 'Carga exitosa',
          body: 'Se cargo correctamente el archivo en el sistema',
        })
      );
    } catch (e) {
      raiseModalError(dispatch, fail, 'Hubo un error al cargar la informacion');
    }
  };
};

const UploadAccountStatmentAction = {
  UploadAccountStatment,
};

export default UploadAccountStatmentAction;
